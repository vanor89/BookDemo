import React from "react";
import Page from "./Page";
import CoverPage from "../pages/CoverPage";
import TextPage from "../pages/TextPage";
import ImageTextPage from "../pages/ImageTextPage";
import type { PageData } from "@/types/page";

const PAGE_COMPONENTS = {
  CoverPage,
  TextPage,
  ImageTextPage,
};

interface PageRendererProps {
  pageData: PageData;
}

const PageRenderer = React.forwardRef<HTMLDivElement, PageRendererProps>(
  ({ pageData }, ref) => {
    const { template, content, pageNumber, interactive } = pageData;

    // Get the component for this template
    const TemplateComponent = PAGE_COMPONENTS[template as keyof typeof PAGE_COMPONENTS];

    if (!TemplateComponent) {
      return (
        <Page ref={ref} pageNumber={pageNumber}>
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">Unknown template: {template}</p>
          </div>
        </Page>
      );
    }

    return (
      <Page ref={ref} pageNumber={pageNumber}>
        <TemplateComponent
          pageNumber={pageNumber}
          content={content}
          interactive={interactive}
        />
      </Page>
    );
  }
);

PageRenderer.displayName = "PageRenderer";

export default PageRenderer;
