import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container className="text-center">
        <p className="font-serif text-display-xl text-neutral-300">404</p>
        <h1 className="mt-4 text-headline font-serif text-neutral-950">
          Page not found.
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          The page you are looking for does not exist.
        </p>
        <div className="mt-10">
          <Button href="/">Return home</Button>
        </div>
      </Container>
    </div>
  );
}
