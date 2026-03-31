import Button from "@/app/components/shared/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md px-6 text-center">
        <p className="font-serif text-hero text-navy-200">404</p>
        <h1 className="mt-4 font-serif text-headline text-navy-800">
          Page not found.
        </h1>
        <p className="mt-4 text-lg text-navy-400">
          The page you are looking for does not exist.
        </p>
        <div className="mt-10">
          <Button href="/">Return home</Button>
        </div>
      </div>
    </div>
  );
}
