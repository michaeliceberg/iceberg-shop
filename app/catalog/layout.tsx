import CatalogLayout from '../../components/layouts/CatalogLayout'

export const metadata = {
  title: 'Айсберг | Каталог',
}

export default function ComparisonRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CatalogLayout>{children}</CatalogLayout>
}
