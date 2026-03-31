import Container from "@/app/components/shared/Container";
import Button from "@/app/components/shared/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <Container className="text-center">
        <p className="font-serif text-display-2xl text-surface-border">404</p>
        <h1 className="mt-4 font-serif text-headline text-text-primary">
          Page not found.
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          The page you are looking for does not exist.
        </p>
        <div className="mt-10">
          <Button href="/">Return home</Button>
        </div>
      </Container>
    </div>
  );
}
