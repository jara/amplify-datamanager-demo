import * as React from "react"
import {
  ChakraProvider,
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
  theme,
  Heading,
  Divider,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { useCallback, useEffect, useState } from "react"
import { DataStore } from "aws-amplify"
import { Listing } from "./models"
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App({ signOut: any, user: object }) {
  const [listings, setListings] = useState<any | any> ([]);

  async function getListings() {
    const listings = await DataStore.query(Listing)
    setListings(listings)
  }

  useEffect(() => {
    getListings()
    const subscription = DataStore.observe(Listing).subscribe(() => getListings())
    return () => subscription.unsubscribe()
  })

  return (
  <ChakraProvider theme={theme}>
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>

          <Box textAlign="center" fontSize="xl">
          <Heading pt='5px'>My Amplify app</Heading>
          <Table my="8" borderWidth="1px" fontSize="sm">
            <Thead bg={mode('gray.50', 'gray.800')}>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th >Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listings.map((listing: { id: any; name: any; description: any; date: any }) => (
                <Tr key={listing.id}>
                  <Td>{listing.name}</Td>
                  <Td>{listing.description}</Td>
                  <Td>{listing.date}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </Box>
        </main>
      )}
      
    </Authenticator>
  </ChakraProvider>
  )
}

export default App;