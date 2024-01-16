import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logoImg from './assets/logo.svg'

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  width: 350px;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 8px;
  border: 1px solid #bbb;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #00875f;
  color: white;
`;

const ClearButton = styled.button`
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #ff4500;
  color: white;
  display: ${(props) => (props.show ? "block" : "none")};
`;

//const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getUsers = async () => {
    try {
      const res = await axios.get("https://wild-pink-coati-tux.cyclic.app/api/items");
      const sortedUsers = res.data.sort((a, b) => {
        const yearComparison = b.ano- a.ano;

        if (yearComparison !== 0) {
          return yearComparison; // Ordena por ano primeiro
        }

        const monthA = getMonthIndex(a.mes);
        const monthB = getMonthIndex(b.mes);

        return monthA - monthB; // Em seguida, ordena por mês
      });
      setUsers(sortedUsers);
    } catch (error) {
      toast.error(error);
    }
  };

  const getMonthIndex = (monthString) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ];
    return months.indexOf(monthString);
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  const handleSearch = () => {
    // Aqui você pode adicionar lógica de pesquisa
    // Por exemplo, filtrar os usuários com base no searchTerm
    const filteredUsers = users.filter((user) => {
      const userString = `${user.ano} ${user.capacidade} ${user.mes} ${user.type}`.toLowerCase();
      return userString.includes(searchTerm.toLowerCase());
    });

    setUsers(filteredUsers);
  };
  const handleClearSearch = () => {
    setSearchTerm("");
    getUsers(); // Restaura a lista original de usuários
  };

  return (
    <>
      <Container>
        <Logo src={logoImg}/>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Digite para buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Buscar</SearchButton>
          <ClearButton show={searchTerm !== ""} onClick={handleClearSearch}>
            Limpar
          </ClearButton>
        </SearchContainer>

        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
