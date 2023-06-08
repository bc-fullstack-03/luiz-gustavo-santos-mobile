import { useState } from 'react'
import Checkbox from 'expo-checkbox'
import { Formik } from 'formik'
import { useTheme } from 'styled-components/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
import * as yup from 'yup'
import Toast from 'react-native-toast-message'

import { usePost } from '../../context/Post'
import { ModalBase } from '../Modal'
import { Input } from '../Input'
import { Button } from '../Button'
import { Separator } from '../Separator'
import { Text } from '../Text'

import * as S from './styles'

type FormPostData = {
  title: string
  description?: string
}

type ImageFile = {
  name: string
  uri: string
  type: string
}

type ModalCreatePostProps = {
  open: boolean
  onClose: () => void
  onRefreshFeed: () => Promise<void>
}

const postSchema = yup.object({
  title: yup.string().required('Titulo é obrigatório.'),
  description: yup.string().optional()
})

export const ModalCreatePost: React.FC<ModalCreatePostProps> = ({
  onClose,
  open,
  onRefreshFeed
}) => {
  const [isChecked, setChecked] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [file, setFile] = useState<ImageFile | null>(null)
  const theme = useTheme()
  const { closeModalCreatePost, createPost } = usePost()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      const uri = result.assets[0]?.uri
      setSelectedImage(uri)
      const name = uri.match(/[^\\/]+$/)?.[0]

      if (name) {
        setFile({
          name,
          uri,
          type: 'image/jpg'
        })
      }
    }
  }

  const onSubmit = async (values: FormPostData) => {
    try {
      const formData = new FormData()

      if (file && isChecked) {
        formData.append('file', file as unknown as Blob)
      }

      formData.append('title', values.title)
      formData.append('description', values.description || '')

      await createPost(formData)

      onRefreshFeed()
      setSelectedImage(null)
      closeModalCreatePost()
    } catch (error) {
      console.log('CreatePost', error)
    }
  }
  return (
    <ModalBase
      visible={open}
      transparent
      title="Novo Post"
      onRequestClose={onClose}
      onClose={onClose}
    >
      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={postSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ handleChange, values, errors, handleSubmit }) => (
          <>
            <Input
              label="Titulo"
              backgroundColor={theme.colors.mainBg}
              value={values.title}
              onChangeText={handleChange('title')}
              errorMessage={errors.title}
            />
            {!isChecked && (
              <>
                <Separator size={16} />
                <Input
                  label="Descrição"
                  backgroundColor={theme.colors.mainBg}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  errorMessage={errors.description}
                />
              </>
            )}
            <Separator size={16} />
            <S.Box>
              <Checkbox value={isChecked} onValueChange={setChecked} />
              <Text>Post com imagem?</Text>
            </S.Box>
            <Separator size={16} />

            {isChecked && selectedImage && (
              <>
                <S.ImageStyled
                  source={{
                    uri: selectedImage
                  }}
                />
                <Separator size={16} />
              </>
            )}
            {isChecked && (
              <>
                <S.PressableStyled onPress={pickImage}>
                  <Ionicons
                    name="image-outline"
                    size={24}
                    color={theme.colors.gray100}
                  />
                  <Text>Click para selecionar</Text>
                </S.PressableStyled>
              </>
            )}

            <Separator size={32} />

            <Button text="Salvar" onPress={() => handleSubmit()} />
          </>
        )}
      </Formik>
      <Toast />
    </ModalBase>
  )
}
