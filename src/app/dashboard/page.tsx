
'use client';

import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { User, Shop, Order, Product } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {DataTable } from "~/components/ui/data-table"
import { useRouter } from "next/router";
import { toast } from "sonner";

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const [users, shops, orders, products] = await Promise.all([
    prisma.user.findMany(),
    prisma.shop.findMany(),
    prisma.order.findMany(),
    prisma.product.findMany(),
  ]);

  return {
    props: {
      session,
      users,
      shops,
      orders,
      products,
    },
  };
};

const AdminPanel = ({ users, shops, orders, products }) => {
  const router = useRouter();

  const handleDelete = async (resource, id) => {
    const res = await fetch(`/api/admin/${resource}?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success(`${resource} deleted successfully`);
      router.replace(router.asPath);
    } else {
      const error = await res.json();
      toast.error(error.error);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={users}
            columns={[
              { title: "Name", field: "name" },
              { title: "Email", field: "email" },
              {
                title: "Actions",
                render: (rowData) => (
                  <Button onClick={() => handleDelete("users", rowData.id)}>
                    Delete
                  </Button>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Shops</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={shops}
            columns={[
              { title: "Name", field: "name" },
              { title: "Owner", field: "ownerEmail" },
              {
                title: "Actions",
                render: (rowData) => (
                  <Button onClick={() => handleDelete("shops", rowData.id)}>
                    Delete
                  </Button>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={orders}
            columns={[
              { title: "Product", field: "productName" },
              { title: "Buyer", field: "buyerEmail" },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={products}
            columns={[
              { title: "Name", field: "name" },
              { title: "Price", field: "price" },
              {
                title: "Actions",
                render: (rowData) => (
                  <Button onClick={() => handleDelete("products", rowData.id)}>
                    Delete
                  </Button>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
