import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../store/user-slice';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  IconButton,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg="gray.50"
      borderRadius="2xl"
      my={6}
      p={8}
    >
      <Stack spacing={8} mx={'auto'} w={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to save properties and enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('invalid email')
                .required('Email required'),
              password: Yup.string()
                .required('Password required')
                .min(6, 'Password is too short, 6 characters minimum'),
            })}
            onSubmit={(values, actions) => {
              signInWithEmailAndPassword(auth, values.email, values.password)
                .then(() => {
                  // Signed in
                  dispatch(
                    login({
                      user: auth.currentUser.email,
                    })
                  );
                  navigate('/');
                  actions.resetForm();
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode, errorMessage);
                  // ..
                });
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl
                    id="email"
                    isRequired
                    isInvalid={!!errors.email && touched.email}
                  >
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Field as={Input} id="email" name="email" type="email" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    id="password"
                    isRequired
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>

                    <InputGroup>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                      />
                      <InputRightElement h={'full'}>
                        <IconButton
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                          icon={showPassword ? <BiShow /> : <BiHide />}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      colorScheme="green"
                    >
                      Login
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      No account yet?{' '}
                      <Button colorScheme="green" variant="link">
                        <Link to="/login">Sign up</Link>
                      </Button>
                    </Text>
                  </Stack>
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}

{
  /* <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <IconButton
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    icon={showPassword ? <BiShow /> : <BiHide />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button loadingText="Submitting" size="lg" colorScheme="green">
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                No account yet?{' '}
                <Button colorScheme="green" variant="link">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </Text>
            </Stack>
          </Stack> */
}
