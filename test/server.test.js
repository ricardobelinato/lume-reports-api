import request from "supertest";
import app from "../server.js";
import fs from "fs";
import path from "path";

jest.mock("chrome-launcher", () => ({
  launch: jest.fn(() =>
    Promise.resolve({
      port: 9222,
      kill: jest.fn(() => Promise.resolve()),
    })
  ),
}));

jest.mock("lighthouse", () =>
  jest.fn(() =>
    Promise.resolve({
      lhr: {
        categories: {
          performance: { score: 0.9 },
          accessibility: { score: 0.8 },
          "best-practices": { score: 0.7 },
          seo: { score: 0.6 },
          pwa: { score: 0.5 },
        },
        audits: {
          "first-contentful-paint": { displayValue: "1s" },
          "largest-contentful-paint": { displayValue: "2s" },
          "total-blocking-time": { displayValue: "100ms" },
          "cumulative-layout-shift": { displayValue: "0.1" },
          interactive: { displayValue: "1.5s" },
          "speed-index": { displayValue: "1.8s" },
        },
      },
    })
  )
);

jest.mock("fs", () => {
  const originalModule = jest.requireActual("fs");
  return {
    ...originalModule,
    mkdirSync: jest.fn(),
    existsSync: jest.fn(() => false),
    writeFileSync: jest.fn(),
  };
});

describe("API Endpoints", () => {
  describe("GET /", () => {
    it("deve retornar uma mensagem de sucesso", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty(
        "message",
        "API is running successfully"
      );
      expect(response.body).toHaveProperty("timestamp");
    });
  });

  describe("POST /generate-report", () => {
    it("deve retornar erro se a URL não for fornecida", async () => {
      const response = await request(app).post("/generate-report").send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("message", "URL is required");
    });

    it("deve gerar o relatório com sucesso", async () => {
      const response = await request(app)
        .post("/generate-report")
        .send({ url: "https://example.com" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty(
        "message",
        "Report generated successfully"
      );
      expect(response.body).toHaveProperty("reportPath");
      expect(response.body).toHaveProperty("data");

      const data = response.body.data;
      expect(data).toHaveProperty("timestamp");
      expect(data).toHaveProperty("scores");
      expect(data.scores).toHaveProperty("performance", 90); // 0.9 * 100
      expect(data.scores).toHaveProperty("accessibility", 80); // 0.8 * 100
      expect(data.scores).toHaveProperty("bestPractices", 70); // 0.7 * 100
      expect(data.scores).toHaveProperty("seo", 60); // 0.6 * 100
      expect(data.scores).toHaveProperty("pwa", 50); // 0.5 * 100

      expect(data).toHaveProperty("metrics");
      expect(data.metrics).toHaveProperty("FCP", "1s");
      expect(data.metrics).toHaveProperty("LCP", "2s");
      expect(data.metrics).toHaveProperty("TBT", "100ms");
      expect(data.metrics).toHaveProperty("CLS", "0.1");
      expect(data.metrics).toHaveProperty("TTI", "1.5s");
      expect(data.metrics).toHaveProperty("SpeedIndex", "1.8s");
    });
  });
});
