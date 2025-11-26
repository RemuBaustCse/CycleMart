import { Helmet } from "react-helmet";

type Props = {
    title: string;
  };
export const PageTitle = ({title}:Props) => {
    return (
        <Helmet>
        <title>{title}</title>
    </Helmet>
    )

}