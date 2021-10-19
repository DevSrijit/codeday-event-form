import React, { useState } from 'react';
import TextInput from '@codeday/topo/Atom/Input/Text';
import Button from '@codeday/topo/Atom/Button';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import { apiFetch, useToasts } from '@codeday/topo/utils';
import { print } from 'graphql';
import { SubscribeMutation } from './EventMailingListSubscribe.gql';
import DataCollection from '@codeday/topo/Molecule/DataCollection';

export default function EventMailingListSubscribe({ event, children, ...props }) {
  const [email, setEmail] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToasts();
  return (
    <Box w="md" ml="auto" mr="auto" {...props}>
      {children}
      <Grid templateColumns="1fr min-content">
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          borderRightWidth={0}
        />
        <Button
          isLoading={isSubmitting}
          variantColor="green"
          onClick={async () => {
            setIsSubmitting(true);
            try {
              await apiFetch(print(SubscribeMutation), {
                email,
                eventWhere: {
                  id: event.id,
                },
              });
              success('Confirmed!');
            } catch (e) {
              error(e.toString());
            }
            setIsSubmitting(false);
          }}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
        >
          Submit
        </Button>
      </Grid>
      <DataCollection message="pii" />
    </Box>
  )
}