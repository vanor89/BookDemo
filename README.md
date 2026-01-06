# BookDemo - Interactive Digital Book Experience

An interactive book/brochure website built with Next.js, React, TypeScript, and Tailwind CSS. Features beautiful page-turning animations and support for interactive elements.

## Features

- Beautiful page-turning animations using react-pageflip
- Mobile-responsive design (mobile-first approach)
- Keyboard navigation support (Arrow keys, Home/End)
- TypeScript for type safety
- Tailwind CSS for styling
- Modular component architecture
- Easy content swapping via JSON

## Getting Started

### Prerequisites

- Node.js 22+ (managed via Volta)
- npm 10+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── book/        # Book viewer route
│   └── page.tsx     # Landing page
├── components/
│   ├── book/        # Book-specific components
│   ├── pages/       # Page templates
│   └── ui/          # Reusable UI components
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── data/
│   └── books/       # Book content (JSON)
└── types/           # TypeScript type definitions
```

## Adding New Content

To replace the Peter Rabbit placeholder with your own content:

1. Create a new folder in `src/data/books/your-book-name/`
2. Add `config.json` with book metadata
3. Add `pages.json` with page content
4. Update the import in `src/app/book/page.tsx`

### Content Schema

See `src/data/schema.ts` for the complete schema. Example:

```json
{
  "pageNumber": 1,
  "type": "text",
  "template": "TextPage",
  "content": {
    "text": "Your content here..."
  }
}
```

## Available Page Templates

- **CoverPage** - Book cover with title and author
- **TextPage** - Text-only page with optional illustration
- **ImageTextPage** - Split layout with image and text

## Keyboard Shortcuts

- **Arrow Right / Page Down** - Next page
- **Arrow Left / Page Up** - Previous page
- **Home** - First page
- **End** - Last page

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: react-pageflip, Framer Motion
- **Page Flip Library**: react-pageflip

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
```

See `next.config.ts` for build configuration.

## Next Steps

- Add more page templates (video, interactive elements)
- Implement modal system for complex interactions
- Add bookmarking and progress tracking
- Create visual content editor
- Add more animations

## License

MIT
