import { gql } from 'apollo-angular';

const GET_DATAS = gql`
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
      img
      position
    }
    piscines {
      id
      nom
      adresse
      departement
      ville
      creation
      quartier
      position
    }
  }
`;

export { GET_DATAS };
