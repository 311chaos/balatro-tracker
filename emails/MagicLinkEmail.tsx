import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { colors } from "@/config/colors";

type MagicLinkEmailProps = {
  url: string;
};

export const MagicLinkEmail = ({ url }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Your sign-in link for Balatro Tracker</Preview>
    <Body style={body}>
      <Container style={container}>
        <Heading style={heading}>Balatro Tracker</Heading>
        <Text style={text}>Click the button below to sign in.</Text>
        <Section style={buttonSection}>
          <Button href={url} style={button}>
            Sign in
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          If you didn&apos;t request this email, you can safely ignore it.
        </Text>
      </Container>
    </Body>
  </Html>
);

const body: React.CSSProperties = {
  backgroundColor: colors.zinc[950],
  fontFamily: "sans-serif",
};

const container: React.CSSProperties = {
  margin: "40px auto",
  padding: "32px",
  maxWidth: "480px",
  backgroundColor: colors.zinc[900],
  borderRadius: "12px",
  border: `1px solid ${colors.zinc[700]}`,
};

const heading: React.CSSProperties = {
  color: colors.stake.white,
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 16px",
};

const text: React.CSSProperties = {
  color: colors.zinc[200],
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const buttonSection: React.CSSProperties = {
  textAlign: "center",
};

const button: React.CSSProperties = {
  backgroundColor: colors.stake.gold,
  color: colors.zinc[950],
  borderRadius: "6px",
  padding: "12px 28px",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  display: "inline-block",
};

const hr: React.CSSProperties = {
  borderColor: colors.zinc[700],
  margin: "24px 0 16px",
};

const footer: React.CSSProperties = {
  color: colors.zinc[400],
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0",
};
