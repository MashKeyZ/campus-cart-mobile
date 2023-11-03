import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';

const ShowDialog = ({openDialog,setDialog,tittle,text,deleteItem}) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setDialog(true);

  const hideDialog = () => setDialog(false);

  return (
        <Portal>
          <Dialog visible={openDialog} onDismiss={hideDialog}>
            <Dialog.Title>{tittle}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{text}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={deleteItem}>Confirm</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
  );
};

export default ShowDialog;