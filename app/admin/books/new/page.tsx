import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExamForm from "@/components/admin/forms/ExamForm"; // Updated to use ExamForm

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <ExamForm /> {/* Changed from BookForm to ExamForm */}
      </section>
    </>
  );
};

export default Page;