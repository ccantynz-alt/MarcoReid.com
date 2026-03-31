import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container className="text-center">
        <p className="font-serif text-6xl text-navy-200">404</p>
        <h1 className="mt-4 font-serif text-3xl text-navy-500">
          Page not found
        </h1>
        <p className="mt-2 text-navy-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Button href="/">Return home</Button>
        </div>
      </Container>
    </div>
  );
}
