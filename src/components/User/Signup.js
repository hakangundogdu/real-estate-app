import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase-config';
import { useDispatch } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';

import { login } from '../../store/user-slice';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
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

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      dispatch(
        login({
          user: auth.currentUser.email,
        })
      );
      navigate('/');
    });
  };

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
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to save properties and enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
          <Formik
            initialValues={{
              firstname: '',
              lastname: '',
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              firstname: Yup.string().required('Username required'),
              email: Yup.string()
                .email('invalid email')
                .required('Email required'),
              password: Yup.string()
                .required('Password required')
                .min(6, 'Password is too short, 6 characters minimum'),
            })}
            onSubmit={(values, actions) => {
              createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
              )
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
                  <HStack align={'flex-start'}>
                    <Box>
                      <FormControl
                        id="firstname"
                        isRequired
                        isInvalid={!!errors.firstname && touched.firstname}
                      >
                        <FormLabel htmlFor="firstname">First Name</FormLabel>
                        <Field
                          as={Input}
                          id="firstname"
                          name="firstname"
                          type="text"
                        />
                        <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName">
                        <FormLabel htmlFor="lastname">Last Name</FormLabel>
                        <Field
                          as={Input}
                          id="lastname"
                          name="lastname"
                          type="text"
                        />
                      </FormControl>
                    </Box>
                  </HStack>

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
                      Sign up
                    </Button>
                  </Stack>
                </Stack>
              </form>
            )}
          </Formik>
          <Stack spacing={6} pt={6}>
            <Button
              leftIcon={<FcGoogle size={24} />}
              type="submit"
              loadingText="Submitting"
              size="lg"
              colorScheme="gray.700"
              variant="outline"
              _hover={{ bg: 'green.50' }}
              onClick={handleSignWithGoogle}
            >
              Signup with Google
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already a user?{' '}
              <Button colorScheme="green" variant="link">
                <Link to="/login">Log in</Link>
              </Button>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
