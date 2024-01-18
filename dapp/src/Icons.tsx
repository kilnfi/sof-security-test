type Props = {
  className?: string;
};

export const KilnLogoShort = ({ className }: Props) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.1632 17.8522C23.3738 17.6355 23.6639 17.5031 23.9858 17.5031C24.3076 17.5031 24.5937 17.6315 24.8003 17.8442L29.9103 23.0042C30.3235 23.4215 30.995 23.4215 31.4083 23.0042L35.4732 18.8994C35.8864 18.4821 35.8864 17.804 35.4732 17.3867L26.9579 8.77597C25.3209 7.12285 22.6626 7.12285 21.0255 8.77597L12.5023 17.3827C12.0891 17.8 12.0891 18.4781 12.5023 18.8954L16.5672 23.0002C16.9805 23.4175 17.652 23.4175 18.0652 23.0002L23.1672 17.8482L23.1632 17.8522Z"
      fill="#FF6521"
    />
    <path
      d="M41.0485 23.0084L39.2009 21.1426C38.7876 20.7253 38.1161 20.7253 37.7028 21.1426L24.8009 34.171C24.5942 34.3797 24.3042 34.5121 23.9863 34.5121C23.6684 34.5121 23.3823 34.3837 23.1717 34.175L10.2737 21.1426C9.86046 20.7253 9.18894 20.7253 8.77569 21.1426L6.92801 23.0084C5.29092 24.6615 5.29092 27.3458 6.92801 28.999L21.022 43.2312C22.6591 44.8844 25.3174 44.8844 26.9545 43.2312L41.0485 28.999C42.6856 27.3458 42.6856 24.6615 41.0485 23.0084Z"
      fill="currentColor"
    />
  </svg>
);

export const LoadingIcon = ({ className }: Props) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);