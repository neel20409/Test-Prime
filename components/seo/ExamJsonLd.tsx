import React from "react";
import { BankExamConfig } from "@/config/bank-exams";

interface ExamJsonLdProps {
  exam: BankExamConfig;
}

export function ExamJsonLd({ exam }: ExamJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://testprime.app";

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: exam.name,
    description: exam.metaDescription,
    educationalLevel: "Competitive Banking Examination",
    assesses: exam.sections.map((s) => s.name).join(", "),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "24800",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bank Mock Tests",
        item: `${baseUrl}/#mock-tests`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: exam.name,
        item: `${baseUrl}/mock-test/${exam.slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: exam.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
