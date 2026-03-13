import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PoliticianCard({ data }) {
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        height: 180,
        mb: 2,
      }}
    >
      <CardMedia
        component="img"
        image={
          data.photoUrl
            ? data.photoUrl
            : data.civility === "Mme"
              ? "/female-placeholder.jpeg"
              : "/male-placeholder.jpeg"
        }
        alt={data.fullName}
        sx={{
          width: 120,
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: 1, overflow: "hidden" }}>
          <Typography gutterBottom variant="h6" noWrap>
            {data.fullName}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: data.currentParty?.color || "text.secondary",
              fontWeight: "bold",
            }}
            noWrap
          >
            {data.currentParty?.shortName || "Pas de parti"}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
