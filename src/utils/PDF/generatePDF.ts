import { CardProps } from "../../domain/entities/card";

// Configuration do generate PDF
import ejs from "ejs";
import pdf from "html-pdf";
import path from "path";

export async function generatePDF(card: CardProps) {
  const model = path.resolve(__dirname, "model.ejs");
  let result: any;

  // Generating PDF
  try {
    ejs.renderFile(model, card, (err, html) => {
      if (err) {
        throw new Error(`Something wrong happend`);
      } else {
        pdf.create(html).toFile(__dirname + "/card.pdf", (err, pdf) => {
          if (err) {
            throw new Error(`Impossible create the PDF`);
          } else {
            console.log(pdf);
          }
        });
        result = html;
      }
    });

    return result;
  } catch (err: any) {
    return { error: err?.message };
  }
}
