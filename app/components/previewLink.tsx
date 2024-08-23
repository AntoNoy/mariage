import React, { useCallback, useEffect } from "react";

type Props = {
  children?: any;
  href: string;
  datas: (
    data:
      | {
          image?: string;
          title?: string;
          description?: string;
          screenshot?: string;
        }
      | undefined
  ) => any;
};

export default function PreviewLink({ href, datas }: Props) {
  let [dataPreview, setDataPreview] = React.useState<
    | {
        image?: string;
        title?: string;
        description?: string;
        screenshot?: string;
      }
    | undefined
  >();

  let handleFetchImage = useCallback(async (url: string) => {
    fetch(`/api/link-preview?url=${url}`)
      .then(async (res) => {
        setDataPreview(await res.json());
      })
      .catch(() => {
        console.log('error')
        setDataPreview(undefined);
      });
  }, []);

  useEffect(() => {
    handleFetchImage(href);
  }, [href]);

  return dataPreview ? datas(dataPreview) : undefined;
}
