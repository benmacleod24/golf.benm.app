import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Container, Handicap } from "~/client/components";
import useSWR from "swr";
import { getHndcpReport } from "./api/v1/hndcp";
import { AsyncParseReturnType } from "zod";

interface HandicapPageProps {}

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
	...args: any
) => Promise<infer R>
	? R
	: any;

/**
 * @description Handicap report page.
 * @return {React.FC<HandicapPage>}
 */
const HandicapPage: React.FC<HandicapPageProps> = (props) => {
	const { data } =
		useSWR<AsyncReturnType<typeof getHndcpReport>>("/api/v1/hndcp");

	return (
		<Container.Main>
			<Flex gap={14} flexDir={"column"} pb="10">
				<Handicap.Container>
					<Handicap.Header>Flight A</Handicap.Header>
					<Handicap.Table>
						{data &&
							data.A &&
							data.A.map((p) => (
								<Handicap.Player player={p} key={p.id} />
							))}
					</Handicap.Table>
				</Handicap.Container>
				<Handicap.Container>
					<Handicap.Header>Flight B</Handicap.Header>
					<Handicap.Table>
						{data &&
							data.B &&
							data.B.map((p) => (
								<Handicap.Player player={p} key={p.id} />
							))}
					</Handicap.Table>
				</Handicap.Container>
			</Flex>
		</Container.Main>
	);
};

export default HandicapPage;
