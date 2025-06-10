
import { SQLiteDatabase } from "expo-sqlite"
import _tarefa from "../types/contato"
import { Button, Text, View, StyleSheet } from "react-native"
import {Linking} from 'react-native' 

type _propsContato = {
  dados: _tarefa,
  db: SQLiteDatabase,
  recarregar: any
}

export default function Contato(props: _propsContato, {navigation}) {
  function alterar () {
    navigation.navigate("UpdateScreen")
  }

  const excluir = async () => {
    await props.db.runAsync("DELETE from contatos WHERE id=?", props.dados.id);
    await props.recarregar();
  }
  const ligar = async () => {
    Linking.openURL(`tel:${props.dados.telefone}`);
  }

  return (
    <View>
        <Text>{props.dados.nome}</Text>
         <Button color="green" title="Ligar" onPress={ligar} />
         <Button color="blue" title="Alterar" onPress={alterar} />
          <Button color="red" title="Excluir" onPress={excluir} />
    </View>
  );
}