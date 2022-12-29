import React from "react";
import Link from "next/link";
type Props = {};

const index = (props: Props) => {
  return (
    <div>
      <h1>Thanh toán thành công !</h1>{" "}
      <button>
        <Link href="/">Quay về trang chủ </Link>
      </button>
    </div>
  );
};

export default index;
