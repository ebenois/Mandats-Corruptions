import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export default function PoliticianCard({ data }) {
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        height: 180,
        mb: 2,
        border: 4,
        borderColor: data.currentParty?.color || "#9e9e9e",
        borderRadius: 2,
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          background: "#e0e0e0#",
        }}
      >
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
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <AddIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
