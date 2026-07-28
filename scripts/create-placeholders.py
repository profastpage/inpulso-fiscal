from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
import os

BASE = "/home/z/my-project/public"

PLACEHOLDER_DOCS = [
    ("assets/pdf/1783014957_1f74c0b7.pdf", "Publicacion de Prueba (Gratuita)", "Artículo"),
    ("assets/pdf/1783014978_b877bdba.pdf", "Publicacion de Prueba (Exclusiva - Estandar)", "Artículo"),
    ("assets/pdf/1783015006_77c2e242.pdf", "Publicacion de Prueba (Exclusiva - Premium)", "Artículo"),
    ("assets/pdf/1782947717_3fe99d5d.pdf", "REPORTE MENSUAL DE PRODUCCION NACIONAL", "Reporte periódico"),
    ("assets/pdf/semana-fiscal-22-junio-2026.pdf", "Semana Fiscal — Edicion 22, Junio 2026", "Informe"),
    ("assets/pdf/reforma-pensionaria-implicancias-fiscales.pdf", "Reforma del Sistema Pensionario Peruano: Implicancias Fiscales", "Reporte periódico"),
    ("assets/pdf/panorama-economico-q1-2026.pdf", "Panorama Economico del Peru: Primer Trimestre 2026", "Reporte periódico"),
    ("assets/pdf/evasion-tributaria-peru-2025.pdf", "Investigacion Especial: Evasion Tributaria en el Peru 2025", "Reporte periódico"),
    ("assets/pdf/competitividad-regional-2025.pdf", "Competitividad Regional: Indice de Gestion Fiscal Subnacional 2025", "Reporte periódico"),
    ("assets/pdf/sistema-tributario-2024.pdf", "El Sistema Tributario Peruano: Vision General 2024", "Artículo"),
    ("uploads/pdfs/perspectivas-2024-2025.pdf", "Perspectivas Economicas Peru 2024-2025", "Reporte periódico"),
    ("uploads/pdfs/comparativo-fiscal-andino.pdf", "Analisis Comparativo: Sistemas Fiscales Andinos", "Investigación"),
    ("uploads/pdfs/reforma-tributaria-mype.pdf", "Impacto de la Reforma Tributaria en las MYPE Peruanas", "Investigación"),
    ("uploads/pdfs/reporte-fiscal-q1-2024.pdf", "Reporte Fiscal Peru Q1 2024: Recaudacion y Perspectivas", "Reporte periódico"),
    ("uploads/pdfs/presupuesto-2024.pdf", "Analisis del Presupuesto General de la Republica 2024", "Informe"),
]

def create_placeholder_pdf(filepath, title, doc_type):
    full_path = os.path.join(BASE, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    
    c = canvas.Canvas(full_path, pagesize=A4)
    w, h = A4
    
    # Blue header bar
    c.setFillColorRGB(14/255, 140/255, 225/255)
    c.rect(0, h - 80*mm, w, 80*mm, fill=1, stroke=0)
    
    # Title on blue
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Helvetica-Bold", 18)
    # Wrap title
    words = title.split()
    lines = []
    current = ""
    for word in words:
        test = current + (" " if current else "") + word
        if c.stringWidth(test, "Helvetica-Bold", 18) < w - 60*mm:
            current = test
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    
    y = h - 30*mm
    for line in lines:
        c.drawString(30*mm, y, line)
        y -= 8*mm
    
    # Type badge
    c.setFillColorRGB(1, 1, 1)
    c.roundRect(30*mm, y - 5*mm, 50*mm, 8*mm, 3*mm, fill=1, stroke=0)
    c.setFillColorRGB(14/255, 140/255, 225/255)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(33*mm, y - 2.5*mm, doc_type.upper())
    
    # Body content lines (decorative)
    c.setFillColorRGB(0.4, 0.4, 0.4)
    c.setFont("Helvetica", 10)
    body_y = h - 100*mm
    
    for i in range(20):
        line_w = (80 + (i * 7) % 40) * mm
        c.setFillColorRGB(0.85, 0.85, 0.85)
        c.roundRect(30*mm, body_y - i*10*mm, line_w, 3*mm, 1.5*mm, fill=1, stroke=0)
    
    # Footer
    c.setFillColorRGB(14/255, 140/255, 225/255)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(30*mm, 15*mm, "Instituto Pulso Fiscal")
    c.setFillColorRGB(0.6, 0.6, 0.6)
    c.setFont("Helvetica", 7)
    c.drawString(30*mm, 10*mm, "www.inpulsofiscal.com")
    
    c.save()
    print(f"  Created: {full_path} ({os.path.getsize(full_path)} bytes)")

print("Creating placeholder PDFs...")
for filepath, title, doc_type in PLACEHOLDER_DOCS:
    create_placeholder_pdf(filepath, title, doc_type)
print("Done!")
