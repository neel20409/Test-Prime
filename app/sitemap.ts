import { MetadataRoute } from "next";
import { BANK_EXAMS } from "@/config/bank-exams";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://test-prime-nine.vercel.app";
  const currentDate = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/create`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Programmatic Bank Exam Hubs
  BANK_EXAMS.forEach((exam) => {
    routes.push({
      url: `${baseUrl}/mock-test/${exam.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    });
  });

  return routes;
}
