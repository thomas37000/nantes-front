import { gql } from 'apollo-angular';

const GET_PARCS = gql`
  query GetParcs {
    parcs {
      id
      nom
      adresse
      departement
      ville
      creation
      hectares
      quartier
    }
  }
`;

export { GET_PARCS };
