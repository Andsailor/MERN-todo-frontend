import loadingSpinner from "../assets/loading-spinner.gif";

interface IProps {
  size: string;
}

export default function Spinner({ size }: IProps) {
  return (
    <img className={`size-${size}`} src={loadingSpinner} alt="Spinner gif" />
  );
}
