import Galleries from "@/components/gallery";
import UploadForm from "./action/upload-form";

export default function GalleryPage() {
  return (
    <div>
      <h1>Gallery</h1>
      <UploadForm />
      <Galleries />
    </div>
  );
}
