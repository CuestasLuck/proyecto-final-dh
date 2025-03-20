export function List(props) {
  const { children, className } = props;

  return <li className={className}>{children}</li>;
}

export function ListItem(props) {
  const { children, className } = props;
  const {
    name,
    city,
    country,
    pricePerNight,
    rating,
    description,
  } = props.value;

  return (
    <ul className={className}>
      <h1>{name}</h1>
      <h2>
        {city}, {country}
      </h2>
      <h3>{description}</h3>
      <p>
        Precio por noche: $ {pricePerNight} Rating: {rating}
      </p>
      {children}
    </ul>
  );
}
