import { Card } from "@/components/ui/card";
import CategoriesSearch from "@/features/categories/categories-search/CategoriesSearch";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import NavbarSidebar from "@/layout/navbar/navbar-sidebar/NavbarSidebar";

const Categories = () => {
  return (
    <Layout>
      <div data-testid="home">
        <Container className="px-3 lg:px-0 py-5 grid-cols-12 grid gap-5">
          <aside className="hidden lg:flex flex-col gap-5 col-span-3">
            <Card className="p-2">
              <NavbarSidebar />
            </Card>
          </aside>
          <section className="col-span-12 lg:col-span-9 flex flex-col gap-5">
            <CategoriesSearch />
          </section>
          {/* <aside className="col-span-3 "></aside> */}
        </Container>
      </div>
    </Layout>
  );
};

export default Categories;
