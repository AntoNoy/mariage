import React, { useCallback, useEffect } from "react";
import aBBLogo from "../public/airbnb.jpg";
import noImage from "../public/no_image.jpg";

interface PreviewLinkDatas {
  image?: string;
  title?: string;
  description?: string;
  screenshot?: string;
}

type Props = {
  children?: any;
  href: string;
  datas: (data: PreviewLinkDatas) => any;
};

export default function PreviewLink({ href, datas }: Props) {
  const defaultDataPreview = {};
  let [dataPreview, setDataPreview] =
    React.useState<PreviewLinkDatas>(defaultDataPreview);

  let handleFetchImage = useCallback(async (url: string) => {
    fetch(`/api/link-preview?url=${url}`)
      .then(async (res) => {
        setDataPreview(await res.json());
      })
      .catch(() => {
        console.log("error");
        setDataPreview(defaultDataPreview);
      });
  }, []);

  useEffect(() => {
    handleFetchImage(href);
  }, [href]);

  function formatDatas(datas: PreviewLinkDatas): PreviewLinkDatas {
    if (!datas.image) {
      datas.image = href.includes("airbnb") ? aBBLogo.src : noImage.src;
    }
    if (!isNaN(parseInt(datas.title||''))) {
      datas.title = undefined;
    }
    if (!datas.title) {
      datas.title = href;
    }

    return datas;
  }

  return datas(formatDatas(dataPreview));
}
