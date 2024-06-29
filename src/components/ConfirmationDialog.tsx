import React from 'react'
import { Button, Dialog, Portal, Text } from 'react-native-paper'

interface ConfirmationDialogProps {
  titleText: string
  contentText: string
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}
export default function ConfirmationDialog(
  props: ConfirmationDialogProps,
): React.ReactElement {
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.onCancel}>
        <Dialog.Title>{props.titleText}</Dialog.Title>
        <Dialog.Content>
          <Text>{props.contentText}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={props.onCancel} textColor="#037AFF">
            No
          </Button>
          <Button onPress={props.onConfirm} textColor="#037AFF">
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
