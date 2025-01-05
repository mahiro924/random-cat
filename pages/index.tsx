import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";

// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};

// ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl); // 初期値を渡す
  const [loading, setLoading] = useState(false); // 初期状態はfalseにしておく
  // useEffect(() => {
  //   fetchImage().then((newImage) => {
  //     setImageUrl(newImage.url);
  //     setLoading(false);
  //   });
  // }, []);
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        One more cat!
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
};
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};


// -----------------------------------------------

// import { NextPage } from "next";
// import { useEffect, useState } from "react";

// const IndexPage: NextPage = () => {
//   // ❶ useStateを使って状態を定義する
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(true);
//   // ❷ マウント時に画像を読み込む宣言
//   useEffect(() => {
//     fetchImage().then((newImage) => {
//       setImageUrl(newImage.url); // 画像URLの状態を更新する
//       setLoading(false); // ローディング状態を更新する
//     });
//   }, []);
//     //   // ❸ ローディング中でなければ、画像を表示する
//     //   return <div>{loading || <img src={imageUrl} />}</div>;
//   // ボタンをクリックしたときに画像を読み込む処理
//   const handleClick = async () => {
//     setLoading(true); // 読込中フラグを立てる
//     const newImage = await fetchImage();
//     setImageUrl(newImage.url); // 画像URLの状態を更新する
//     setLoading(false); // 読込中フラグを倒す
//   };
//   return (
//     <div>
//       <button onClick={handleClick}>他のにゃんこも見る</button>
//       <div>{loading || <img src={imageUrl} />}</div>
//     </div>
//   );
// };
// export default IndexPage;

// type Image = {
//     url: string;
//   };
// const fetchImage = async (): Promise<Image> => {
//     const res = await fetch("https://api.thecatapi.com/v1/images/search");
//     const images = await res.json();
//     console.log(images);
//     return images[0];
// };

