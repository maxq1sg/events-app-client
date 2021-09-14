import { useRouter } from "next/dist/client/router";

const SingleUser = () => {
  const router = useRouter();
  const { userId } = router.query;
  return <div>single user {userId}</div>;
};

export default SingleUser;
