import { FileBlockProps } from "@githubnext/blocks";
import { ActionList, ActionMenu, Box } from "@primer/react";
import { useState } from "react";
import { RedocStandalone } from "redoc";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const VIEWERS = {
  SWAGGERUI: "Swagger UI",
  REDOC: "Redoc",
};

export default function OpenAPIViewerBlock(props: FileBlockProps) {
  const [viewer, setViewer] = useState(VIEWERS.REDOC);
  const { context } = props;

  const rawFileUrl = `https://raw.githubusercontent.com/${context.owner}/${context.repo}/${context.sha}/${context.path}`;

  let spec;

  if (viewer === VIEWERS.REDOC) {
    spec = <RedocStandalone specUrl={rawFileUrl} />;
  } else {
    spec = <SwaggerUI url={rawFileUrl} />;
  }

  return (
    <Box p={4}>
      <Box
        borderColor="border.default"
        borderWidth={1}
        borderStyle="solid"
        borderRadius={6}
        overflow="hidden"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          bg="canvas.subtle"
          p={3}
          borderBottomWidth={1}
          borderBottomStyle="solid"
          borderColor="border.default"
        >
          <Box>
            <strong>{context.path}</strong>
          </Box>
          <Box>
            <ActionMenu>
              <ActionMenu.Button aria-label="Select theme">
                Viewer: {viewer}
              </ActionMenu.Button>
              <ActionMenu.Overlay>
                <ActionList selectionVariant="single">
                  <ActionList.Item
                    selected={viewer === VIEWERS.REDOC}
                    onSelect={() => setViewer(VIEWERS.REDOC)}
                  >
                    {VIEWERS.REDOC}
                  </ActionList.Item>
                  <ActionList.Item
                    selected={viewer === VIEWERS.SWAGGERUI}
                    onSelect={() => setViewer(VIEWERS.SWAGGERUI)}
                  >
                    {VIEWERS.SWAGGERUI}
                  </ActionList.Item>
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          </Box>
        </Box>
        <Box>{spec}</Box>
      </Box>
    </Box>
  );
}
