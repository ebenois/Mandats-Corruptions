import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

export default function PoliticianCard({
  data,
  isChecked,
  onCardClick,
  isFull,
}) {
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
        opacity: !isChecked && isFull ? 0.5 : 1,
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

      <CardActions disableSpacing>
        {isChecked ? (
          <IconButton aria-label="remove from deck" onClick={onCardClick}>
            <IndeterminateCheckBoxIcon sx={{ color: "red" }} />
          </IconButton>
        ) : !isFull ? (
          <IconButton aria-label="add to deck" onClick={onCardClick}>
            <AddBoxIcon sx={{ color: "green" }} />
          </IconButton>
        ) : (
          <Box sx={{ width: 40 }} />
        )}
      </CardActions>
    </Card>
  );
}
