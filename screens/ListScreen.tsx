import { StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import { FAB } from '@rneui/themed';
import{useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import _contato from '../types/contato';
import Contato from '../components/Contato';

const db = SQLite.openDatabaseSync("contatos.sqlite");

export default function ListScreen({navigation}) {

  const [visible, setVisible] = React.useState(true);
  const[contatos,setContatos] = useState<_contato[]>([]);
  const[busca,setBusca] = useState<string>('');

  useEffect(
    () =>{
      db.execSync(`CREATE TABLE IF NOT EXISTS contatos(
        id INTEGER PRIMARY KEY autoincrement,
        nome VARCHAR(100),
        telefone INTEGER DEFAULT 0
      )`);
      recarregar();
    }
  ,[]);

const recarregar = async (busca : string = "") =>{
  let listaContatos : _contato[] = await db.getAllAsync("SELECT * FROM contatos where upper(nome) like upper('%"+busca+"%') order by nome");
  setContatos(listaContatos);
}

const renderLista = () =>{
  let c = contatos.map(c => 
    <Contato
    dados={c}
    db={db}
    recarregar = {recarregar}
    key={c.id}/>
      );
  return c;
}

function adicionar(){
    navigation.navigate("AddScreen");
}
  return (
  <View >
    <TextInput
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar..."
        placeholderTextColor="#555"
    />
    {renderLista()}
    <FAB
        visible={visible}
        icon={{ name: 'add', color: 'white' }}
        color="green"
        onPress={adicionar}
      />
  </View>
);
}