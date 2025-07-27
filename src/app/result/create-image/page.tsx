import ShareKakaoButton from "@/components/ShareKakaoButton";

export default function Page() {
  return (
    <>
      이미지 만들기 페이지
      <ShareKakaoButton
        type="image"
        imageUrl="https://via.placeholder.com/400x300.png?text=변명+연구소"
      />
    </>
  );
}
