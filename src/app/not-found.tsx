import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl">404</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <span  aria-label="confused emoji" className="text-6xl">😢</span>
            <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Oops! The page you&apos;re looking for does not exist.
            </p>
            <Link href="/" passHref>
              <Button variant="ghost" className="mt-6">
                Go to Homepage
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
