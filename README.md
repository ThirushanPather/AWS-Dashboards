# Dashboard Library
Monorepo containing all React dashboards deployed to AWS S3 + CloudFront.

## Structure
- /packages/dashboard-poc — proof of concept
- /packages/shared-components — reusable components

## Tech Stack
- React + Vite
- Recharts + Tailwind CSS
- AWS S3 + CloudFront
- UiPath data pipeline (coming soon)

## Adding a new dashboard
1. Create a new folder under /packages/
2. Copy dashboard-poc structure as a template
3. Update data files and config
4. Add build script to root package.json
5. Run the deploy script
