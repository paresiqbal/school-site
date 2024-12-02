import Loading from "@/components/Loading";

export default function NewsListLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>Loading...</h1>
      <Loading size="large" color="text-green-500" />
    </div>
  );
}
