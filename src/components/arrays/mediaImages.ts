export type ImageItem = {
    src: string;
    title: string;
    description?: string;
    children?: ImageItem[];
};

// BASISVORLAGE 
// {
//   src: "/path/to/image",
//   title: "Titel",
//   children: [
//     { src: "/path/to/image",
//       title: "Titel(wird nicht angezeigt)",
//       description: "Child Description 1"
//     },
//     { src: "/path/to/image",
//       title: "Titel(wird nicht angezeigt)",
//       description: "Child Description 2"
//     },
//   ]
// },

export const images: ImageItem[] = [
      {
        src: "pics/schachopen/hpfixgal_bilder_2017_gewinner_20_11_2017_19_30_36.jpg",
        title: "Laufenburger Schach-Open 2017",
        children: [
          { src: "pics/schachopen/hpfixgal_bilder_2017_gewinner_20_11_2017_19_30_36.jpg",
            title: "Laufenburger Schach-Open 2017",
            description: "Vom 17.–19.11.2017 fand das 5. Laufenburger Open in Rotzel mit 14 Teilnehmern statt. Aufgrund kurzfristiger Absagen wurde nur ein Open ausgetragen, wobei der B-Open-Preis zum Ratingpreis (TWZ <1800) umgewandelt wurde. Ohne Seriensieger Gregor Haag setzte sich Thomas Fischer (5/5 Punkte) klar durch. Tobias Oelschlegel (bester <1800 TWZ) und Dr. Jürgen Wulf komplettierten das Podium. Nico Zorn (2. <1800) und Paul Kuschminder (bester <1600) wurden prämiert. Dank ging an Schiedsrichter, Küchenteam und Sponsoren."
          },
          { src: "pics/schachopen/hpfixgal_bilder_2017_runde1_fischer_oelschlegel_18_11_2017_20_36_46.jpg",
            title: "Laufenburger Schach-Open 2017",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2017_runde1_teilnehmer_18_11_2017_20_36_48.jpg",
            title: "Laufenburger Schach-Open 2017",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2017_runde2_eichler_zorn_18_11_2017_20_36_48.jpg",
            title: "Laufenburger Schach-Open 2017",
          },

          { src: "pics/schachopen/hpfixgal_bilder_2017_runde3_vorderebretter_18_11_2017_20_36_48.jpg",
            title: "Laufenburger Schach-Open 2017",
          },
        ],
      },
      {
        src: "pics/Open16/A_Open_R2.jpg",
        title: "Laufenburger Schach-Open 2016",
        children: [
          { src: "pics/Open16/A_Open_R2.jpg", 
            title: "Laufenburger Schach-Open 2016",
            description: "Titelverteidiger Gregor Haag (2270 ELO) gewann das 4. Laufenburger A-Open ungeschlagen. Trotz Konkurrenten wie Udo Düssel (2188) und Michael Schneider (2196) sicherte er sich mit vier Siegen, darunter einem entscheidenden Schwarzsieg gegen Düssel in Runde 4, früh den Titel. Schneider und Robert Eichler erreichten das Podest, während Haag seine Dominanz bestätigte."          
          },
          { src: "pics/Open16/duessel-haag.jpg", 
            title: "Laufenburger Schach-Open 2016",
            description: "Weder Udo Düssel"
          },
          { src: "pics/Open16/eichler-haag.jpg", 
            title: "Laufenburger Schach-Open 2016",
            description: "Gregor Haag blieb beim 4. Laufenburger Open ungeschlagen und siegte auch in Runde 5. Die Entscheidung um Platz 2 (300 €) fiel im Remis zwischen Udo Düssel und Robert Eichler (je 3/4 Punkte). Michael Schneider (2,5/4) sicherte sich Platz 3 (150 €). Haag dominierte das Turnier ohne Punktverlust."          
          },
          { src: "pics/Open16/haag_r5.jpg", 
            title: "Laufenburger Schach-Open 2016",
          },
          { src: "pics/Open16/duessel-eichler.jpg", 
            title: "Laufenburger Schach-Open 2016",
            description: "Zum Ende hieß der strahlende Sieger erneut Gregor Haag, dem nach einem dritten Platz in der ersten Auflage des Laufenburger Opens zum dritten Mal in Folge nicht zu nehmen war. Dieses Mal konnte er das Turnier ohne Punktverlust bestreiten und wird sich neben 500 € Preisgeld auch über einen deutlichen DWZ und ELO Gewinn freuen. Die weiteren Geldpreise gehen an Robert Eichler, der sich wie bereits 2013 über den 2. Platz freut und an Udo Düssel."
          },
          { src: "pics/Open16/siegerA.jpg", 
            title: "Laufenburger Schach-Open 2016",
            description: "Die glücklichen Sieger. Von links: Udo Düssel (3.), Gregor Haag (1.), Robert Eichler (2.)."
          },
          { src: "pics/Open16/B_Open_R2.jpg",
            title: "Laufenburger Schach-Open 2016",
            description: "Beim 4. Laufenburger Open A-Open setzte sich Titelverteidiger Gregor Haag (2270 ELO) ungeschlagen durch. Trotz Herausforderern wie Udo Düssel (2188 ELO) und Michael Schneider (2196 ELO) sicherte er sich mit vier Siegen, darunter einem entscheidenden Schwarzsieg gegen Düssel in Runde 4, früh den Titel. Schneider und Eichler erreichten das Podest, während Haag seine Dominanz untermauerte."          
          },
          { src: "pics/Open16/B_Open_R4.jpg",
            title: "Laufenburger Schach-Open 2016",
            description: "In der Finalrunde entschieden Brett 1-3 die Platzierungen: Jens Werther und Carl-Friedrich Dübler remisten an Brett 1. Benno Moser gewann das Laufenburger Derby gegen Rainer Borsdorf (Brett 2). Jens Berneck siegte schnell an Brett 3 gegen Matthias Zimmermann. Alle Schlüsselpartien endeten früh."
          },
          { src: "pics/Open16/Moser-Borsdorf.jpg",
            title: "Laufenburger Schach-Open 2016",
          },
          { src: "pics/Open16/werther-duebler.jpg",
            title: "Laufenburger Schach-Open 2016",
            description: "Durch die Ergebnisse der letzten Runde gewinnt erstmalig ein Laufenburger Spieler eine Gruppe des Laufenburger Opens. Unser Vorsitzender Benno Moser, der jedes Jahr viel Zeit und Energie in die Organisation des Turnieres steckt, konnte sich mit 4/5 Punkten selbst dafür belohnen. Neben dem ersten Platz ist er auch der beste Spieler mit einer Wertungszahl unter 1500. Platz 2 konnte sich Carl-Friedrich Dübler, welcher bester Senior wurde, durch seine erfolgreiche Aufholjagd sichern. Jens Berneck schaffte es Jens Werther durch eine etwas bessere Buchholtzwertung von Platz 3 verdrängen."
          },
          { src: "pics/Open16/SiegerB.jpg",
            title: "Laufenburger Schach-Open 2016",
            description: "Die Gewinner des B-Opens. Von links: Carl-Friedrich Dübler (2.), Benno Moser (1.), Jens Berneck (3.)."
          },
        ],
      },
      {
        src: "pics/schachopen/hpfixgal_bilder_2015_img_1937_21_02_2016_13_55_00.jpg",
        title: "Laufenburger Schach-Open 2015",
        children: [
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1937_21_02_2016_13_55_00.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1985_21_02_2016_13_55_14.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1938_21_02_2016_13_55_00.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1939_21_02_2016_13_55_00.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1941_21_02_2016_13_55_00.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1981_21_02_2016_13_55_14.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1982_21_02_2016_13_55_14.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1983_21_02_2016_13_55_14.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1984_21_02_2016_13_55_14.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1941_21_02_2016_13_55_00.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1981_21_02_2016_13_55_14.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1982_21_02_2016_13_55_14.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1983_21_02_2016_13_55_14.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1984_21_02_2016_13_55_14.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1988_21_02_2016_13_55_16.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1993_21_02_2016_13_55_16.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1994_21_02_2016_13_55_18.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_1996_21_02_2016_13_55_18.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2002_21_02_2016_13_55_18.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2004_21_02_2016_13_55_20.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2007_21_02_2016_13_55_20.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2008_21_02_2016_13_55_20.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2012_21_02_2016_13_55_22.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2014_21_02_2016_13_55_22.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2016_21_02_2016_13_55_22.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2017_21_02_2016_13_55_22.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2022_21_02_2016_13_55_24.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2023_21_02_2016_13_55_24.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2026_21_02_2016_13_55_26.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2029_21_02_2016_13_55_26.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2030_21_02_2016_13_55_26.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
          { src: "pics/schachopen/hpfixgal_bilder_2015_img_2045_21_02_2016_13_55_30.jpg", 
            title: "Laufenburger Schach-Open 2015",
          },
        ],
      },
      {
        src: "pics/open14/Runde1_TeilnehmerB.JPG",
        title: "Laufenburger Schach-Open 2014",
        children: [
          { src: "pics/open14/Runde1_TeilnehmerB.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Halle_aussen.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Kaffeestube.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Kueche.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/IMG_3475.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/IMG_3480.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/IMG_3491.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/IMG_3484.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/IMG_3481.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde1_Teilnehmer.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde4_Haag-Ciolek.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde4_Haag-Jehnichen.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde4_Ali.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde5_Aopen2.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde5_BOpen.jpg", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde3_TopbretterA.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde3_TopbretterB.jpg", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde4_Gregor_Andi_ende.JPG", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde2_abend.jpg", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde2_TeilnehmerA.jpg", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Runde2_TeilnehmerB.jpg", 
            title: "Laufenburger Schach-Open 2014",
          },
          { src: "pics/open14/Sieger.jpg", 
            title: "Laufenburger Schach-Open 2014",
          },
        ],
      },
      {
        src: "pics/lakiso12.jpg",
        title: "Lakiso 12",
        children: [
          { src: "pics/lakiso12.jpg", 
            title: "Lakiso 12",
            description: "Nachdem wir 2011 nicht am Lakiso teilnahmen, hieß es dieses Jahr wieder Brüten über Schachaufgaben, allerdings in der Gärtnerklause." 
          },
          { src: "pics/lakiso_12/Lakiso12_02.jpg", 
            title: "Lakiso 12",
            description: "Katja machte als Besucherin eine gute Figur in ihren Partien gegen Julian" 
          },
          { src: "pics/lakiso_12/Lakiso12_brett.jpg", 
            title: "Lakiso 12",
            description: "wie auch unser neues Demobrett als Erklärungshilfe." 
          },
          { src: "pics/lakiso_12/Lakiso12_03.jpg", 
            title: "Lakiso 12",
            description: "An den hier gezeigten Aufgaben musste manch einer doch etwas knabbern..." 
          },
          { src: "pics/lakiso_12/Lakiso12_04.jpg", 
            title: "Lakiso 12",
            description: "weshalb der ein oder andere doch lieber Informationen im Heft seinen Gegenübersitzers suchte" 
          },
          { src: "pics/lakiso_12/Lakiso12_05.jpg", 
            title: "Lakiso 12",
            description: "oder gleich versuchte seinen Trainer zu besiegen." 
          },
          { src: "pics/lakiso_12/Lakiso12_06.jpg", 
            title: "Lakiso 12",
            description: "Die Fragen von Aushilfstrainer Daniel konnten danach allerdings beantwortet werden." 
          },
          { src: "pics/lakiso_12/Lakiso12_07.jpg", 
            title: "Lakiso 12",
            description: "Katja hingegen hatte Probleme mit Schachuhren. Frauen und Technik ;)" 
          },
          { src: "pics/lakiso_12/Lakiso12_08.jpg", 
            title: "Lakiso 12",
            description: "Hilfreicher war es da hoffentlich doch meinen Erklärungen zuzuhören..." 
          },
          { src: "pics/lakiso_12/Lakiso12_09.jpg", 
            title: "Lakiso 12",
            description: "... und das Gelernte gleich Rafael zu zeigen." 
          },
          { src: "pics/lakiso_12/Lakiso12_10.jpg", 
            title: "Lakiso 12",
            description: "Ab und zu schritt aber auch erzum Demobrett um die Teilnehmer auf den Weg in Richtung Bauerndiplom zu bringen." 
          },
          { src: "pics/lakiso_12/Lakiso12_11.jpg", 
            title: "Lakiso 12",
            description: "Nachdem auch die letzten Aufgaben gelöst waren" 
          },
          { src: "pics/lakiso_12/Lakiso12_12.jpg", 
            title: "Lakiso 12",
            description: "konnten sich die 7 Teilnehmer über das bestandene Bauerndiplom freuen. Von links nach rechts: Hanna, Wanda, Tim, Johannes, Felix, Simo und Mert (versteckt)" 
          },
        ],
      },
      {
        src: "pics/jgp_12_laufenburg/jgp_12_3.jpg",
        title: "BSH-JGP Laufenburg 12",
        children: [
          { src: "pics/jgp_12_laufenburg/jgp_12_3.jpg", 
            title: "BSH-JGP Laufenburg 12",
            description: "Zum JGP 2012 waren leider nicht viele Teilnehmer angereist."
          },
          { src: "pics/jgp_12_laufenburg/jgp_12_7.jpg", 
            title: "BSH-JGP Laufenburg 12",
            description: "Trotzdem gab es bei der Gruppe Ü12 interssante Spiele..."
          },
          { src: "pics/jgp_12_laufenburg/jgp_12_2.jpg", 
            title: "BSH-JGP Laufenburg 12",
            description: "wie auch bei den Jüngeren in der U12."
          },
          { src: "pics/jgp_12_laufenburg/jgp_12_1.jpg", 
            title: "BSH-JGP Laufenburg 12",
            description: "In den Pausen zwischen den Spielen wurde entweder interessante Partien, wie hier das Laufenburger Derby Julian (Brotz) gegen Julian (Bahner) bewundert,"
          },
          { src: "pics/jgp_12_laufenburg/../jgp_12_laufenburg/jgp_12_pause.jpg", 
            title: "BSH-JGP Laufenburg 12",
            description: "oder es wurde zur Abwechslung etwas auf dem Pausenhof gekickt."
          },
          { src: "pics/jgp_12_laufenburg/../jgp_12_laufenburg/jgp_12_siegerehrung.jpg", 
            title: "BSH-JGP Laufenburg 12",
            description: "Trotzdem waren alle heiß auf die Siegerehrung, die von Jugendleiter Jochen Bahner durchgeführt wurde. Frau Schäuble entrichtete Grußworte der Stadt Laufenburg und half bei der Preisverteilung"
          },
          { src: "pics/jgp_12_laufenburg/../jgp_12_laufenburg/jgp_12_teilnehmer.jpg", 
            title: "BSH-JGP Laufenburg 12",
            description: "Statt dem üblichem Siegerfoto gibt es dieses Mal ein Foto aller Teilnehmer und Helfer. (Bild Röber)"
          },
        ],
      },
      {
        src: "pics/jgp_11_laufenburg/jgp11_01.jpg",
        title: "BSH-JGP Laufenburg 11",
        children: [
          { src: "pics/jgp_11_laufenburg/jgp11_01.jpg", 
            title: "BSH-JGP Laufenburg 11",
            description: "Begrüßung in der Hans-Thoma-Schule durch die Turnierleiter Wolfgang Scheina und Jochen Bahner"
          },
          { src: "pics/jgp_11_laufenburg/jgp11_02.jpg", 
            title: "BSH-JGP Laufenburg 11",
            description: "Endlich beginnen die Partien bei unseren jüngsten..."
          },
          { src: "pics/jgp_11_laufenburg/jgp11_03.jpg", 
            title: "BSH-JGP Laufenburg 11",
            description: "und auch die etwas älteren Teilnehmer in der U12 durften anfangen."
          },
          { src: "pics/jgp_11_laufenburg/jgp11_04.jpg", 
            title: "BSH-JGP Laufenburg 11",
            description: "Jochen und Rafael können sich also erst mal ausruhen,"
          },
          { src: "pics/jgp_11_laufenburg/jgp11_05.jpg", 
            title: "BSH-JGP Laufenburg 11",
            description: "während Wolfgang, Jens und Benno mitten im Geschehen waren."
          },
          { src: "pics/jgp_11_laufenburg/jgp11_08.jpg", 
            title: "BSH-JGP Laufenburg 11",
            description: "Nach getaner Arbeit durften sich alle bei der Siegerehrung über eine Urkunde und einen Sachpreis freuen."
          },
          { src: "pics/jgp_11_laufenburg/jgp11_09.jpg", 
            title: "BSH-JGP Laufenburg 11",
            description: "Besonders freute sich Julian Brotz über seinen ersten Platz."
          },
          { src: "pics/jgp_11_laufenburg/jgp11_11.jpg", 
            title: "BSH-JGP Laufenburg 11",
            description: "Frau Möltgen überbrachte Grußworte der Stadt."
          },
          { src: "pics/jgp_11_laufenburg/jgp11_13.jpg", 
            title: "BSH-JGP Laufenburg 11",
            description: "Die Sieger der Altersgruppen. Von links nach rechts Kevin Harass U8 (FR-Zähringen), Lars Nägelin U10 (SG Riehen), Julian Brotz U12 (SC Laufenburg), Christopher Weh U14 (SK Engen), Daniel Bahner U16 (SC Laufenburg) und Nicolas Mesot U18 (SC Laufenburg)"
          },
        ],
      },
      {
        src: "pics/jgp_11_brombach/jgp11_01.jpg",
        title: "BSH-JGP Brombach 11",
        children: [
          { src: "pics/jgp_11_brombach/jgp11_01.jpg", 
            title: "BSH-JGP Brombach 11",
            description: "Warmspielen der Jüngsten unter Bewunderung der Familie Moser"
          },
          { src: "pics/jgp_11_brombach/jgp11_02.jpg", 
            title: "BSH-JGP Brombach 11",
            description: "Daniel war von Anfang an siegesbewußt - und er hatte recht!"
          },
          { src: "pics/jgp_11_brombach/jgp11_03.jpg", 
            title: "BSH-JGP Brombach 11",
            description: "Katja hochkonzentriert ..."
          },
          { src: "pics/jgp_11_brombach/jgp11_04.jpg", 
            title: "BSH-JGP Brombach 11",
            description: "... ebenso wie Julian"
          },
          { src: "pics/jgp_11_brombach/jgp11_05.jpg", 
            title: "BSH-JGP Brombach 11",
            description: "Betreuer und Chronist:Jugendleiter Jochen"
          },
          { src: "pics/jgp_11_brombach/jgp11_06.jpg", 
            title: "BSH-JGP Brombach 11",
            description: "Harte Kämpfe im Dreiländercup"
          },
          { src: "pics/jgp_11_brombach/jgp11_07.jpg", 
            title: "BSH-JGP Brombach 11",
            description: "Vesperpause"
          },
          { src: "pics/jgp_11_brombach/jgp11_08.jpg", 
            title: "BSH-JGP Brombach 11",
            description: "Turnieratmosphäre"
          },
          { src: "pics/jgp_11_brombach/jgp11_09.jpg", 
            title: "BSH-JGP Brombach 11",
            description: "Unsere Anfänger waren guter Stimmung"
          },
          { src: "pics/jgp_11_brombach/jgp11_alle.jpg", 
            title: "BSH-JGP Brombach 11",
            description: "Die gesamten Laufenburger Teilnehmer. Von links nach rechts: Nick Herrmann, Katja Stein, Julian Brotz, Jochen Bahner, Julian Bahner, Daniel Bahner, Nicolas Mesot"
          },
        ],
      },
      {
        src: "pics/Challenge_murg_mehun_11/murg_mehun_01.jpg",
        title: "Challenge Murg-Mehun 2011",
        children: [
          { src: "pics/Challenge_murg_mehun_11/murg_mehun_01.jpg", 
            title: "Challenge Murg-Mehun 2011",
            description: "Hier ein Bild der Spieler, von links: Leo, Joel (Mehun), Pieurette (Mehun), Francois (Mehun) und Benno, Heinz fehlt."
          },
          { src: "pics/Challenge_murg_mehun_11/murg_mehun_02.jpg", 
            title: "Challenge Murg-Mehun 2011",
            description: "Nun ist auch Heinz anwesend, sowie Turnierleiter Jochen, leider fehlt dieses Mal Leo."
          },
          { src: "pics/Challenge_murg_mehun_11/murg_mehun_03.jpg", 
            title: "Challenge Murg-Mehun 2011",
            description: "Die Teilnehmer der Challenge wurden anschließend begrüßt."
          },
          { src: "pics/Challenge_murg_mehun_11/murg_mehun_04.jpg", 
            title: "Challenge Murg-Mehun 2011",
            description: "Auch ein Gruppenfoto unserer französischen Freunde darf natürlich nicht fehlen."
          },
          { src: "pics/Challenge_murg_mehun_11/murg_mehun_05.jpg", 
            title: "Challenge Murg-Mehun 2011",
            description: "Anschließend konnte das Turnier dann in lockerer Atmosphäre starten, die drei Laufenburger Spieler Heinz, Benno und Leo spielten gegen die Konkurenten Francois, Joel und Pieurette, im Modus jeder Laufenburger gegen jeden Mehuner. Beobachtet werden sie hier von Fan Tobias und dem Murger Bürgermeister Adrian Schmidle. Am Ende gab es doch einen recht deutlichen 8:1 Sieg für unsere Recken, wobei der Spaß im Vordergrund stand."
          },
        ],
      },
      {
        src: "pics/niko_10/niko10_01.jpg",
        title: "Nikolausblitz 2010",
        children: [
          { src: "pics/niko_10/niko10_01.jpg", 
            title: "Nikolausblitz 2010",
            description: "Elmar (3. Platz)"
          },
          { src: "pics/niko_10/niko10_02.jpg", 
            title: "Nikolausblitz 2010",
            description: "Rafael (2. Platz)"
          },
          { src: "pics/niko_10/niko10_03.jpg", 
            title: "Nikolausblitz 2010",
            description: "Jens als Sieger"
          },
          { src: "pics/niko_10/niko10_04.jpg", 
            title: "Nikolausblitz 2010",
            description: "Hier nochmals als Siegergruppe."
          },
          { src: "pics/niko_10/niko10_05.jpg", 
            title: "Nikolausblitz 2010",
            description: "Vorher und hinterher spielten sich die ersten schon mal warm."
          },
          { src: "pics/niko_10/niko10_06.jpg", 
            title: "Nikolausblitz 2010",
            description: "Mit 13 Spielern war das Turnier das am stärksten besetzte in der Geschichte."
          },
          { src: "pics/niko_10/niko10_07.jpg", 
            title: "Nikolausblitz 2010",
          },
          { src: "pics/niko_10/niko10_08.jpg", 
            title: "Nikolausblitz 2010",
            description: "Auch ein interessierter Zuschauer war anwesend."
          },
          { src: "pics/niko_10/niko10_09.jpg", 
            title: "Nikolausblitz 2010",
            description: "Benno versuchte verzweifelt, noch etwas dazuzulernen"
          },
          { src: "pics/niko_10/niko10_10.jpg", 
            title: "Nikolausblitz 2010",
          },
          { src: "pics/niko_10/niko_sieger.jpg", 
            title: "Nikolausblitz 2010",
            description: "Am Schluß standen wieder zwei Jugendspieler auf dem Podest. Bernhard wurde dritter, Jochen zweiter und Tobias der strahlende Sieger."
          },
          { src: "pics/niko_10/sk_10_12_16.jpg", 
            title: "Nikolausblitz 2010",
            description: "Und so berichtete der Südkurier am 16.12. (Artikel aus Layoutgründen auf zwei Spalten umgebrochen)"
          },
        ],
      },
      {
        src: "pics/jgp_10_laufenburg/jgp10_01.jpg",
        title: "BSH-JGP Laufenburg 10",
        children: [
          { src: "pics/jgp_10_laufenburg/jgp10_01.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "Begrüßung in der Hans-Thoma-Schule durch die Turnierleiter Wolfgang Scheina und Roland Bahner"
          },
          { src: "pics/jgp_10_laufenburg/jgp10_02.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "Alle warten auf den Beginn der Spiele"
          },
          { src: "pics/jgp_10_laufenburg/jgp10_03.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "Die Altersgruppen U18, U16 und U14 spielten gemeinsam..."
          },
          { src: "pics/jgp_10_laufenburg/jgp10_04.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "... in einem eigenen Raum"
          },
          { src: "pics/jgp_10_laufenburg/jgp10_05.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "Für die U12 waren genügend Teilnehmer vorhanden,"
          },
          { src: "pics/jgp_10_laufenburg/jgp10_06.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "während die U8 und U10 ebenfalls gemeinsam in einer Gruppe spielten"
          },
          { src: "pics/jgp_10_laufenburg/jgp10_07.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "Die Betreuung und Ergebnisaufnahme war nicht immer einfach"
          },
          { src: "pics/jgp_10_laufenburg/jgp10_08.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "Die Kaffeestube war gut besucht"
          },
          { src: "pics/jgp_10_laufenburg/jgp10_09.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "und wurde souverän betreut"
          },
          { src: "pics/jgp_10_laufenburg/jgp10_10.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "Die Sieger der Altersgruppen. Hinten von links nach rechts Jonas Engesser U14 (SC Steißlingen), Jochen Bahner U18 (SC Laufenburg), Sarah Hund U12 (SK FR-Zähringen) und Mario Rösch U16 (SK FR-Zähringen) Vorne Mata Bence U8 (SC Steißlingen) und Saphir Sahki (SC Brombach)"
          },
          { src: "pics/jgp_10_laufenburg/jgp10_11.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "Nach getaner Arbeit versammelten sich die meisten Helfer noch zu einem Gruppenbild"
          },
          { src: "pics/jgp_10_laufenburg/sk_10_12_06.jpg", 
            title: "BSH-JGP Laufenburg 10",
            description: "Am Montag, 6.12., berichtete der Südkurier"
          },
        ],
      },
      {
        src: "pics/jhv_10/vorstand.jpg",
        title: "JHV 2010",
        children: [
          { src: "pics/jhv_10/vorstand.jpg", 
            title: "JHV 2010",
            description: "Der Vorstand ist in guter Laune: v.l.n.r. Benno Moser (Schriftführer), Bernhard Bürgin (Kassier), Heinz Meyer (1. Vorsitzender), Wolfgang Scheina (Spielleiter) und Hermann Knütel (Materialwart). Es fehlt Roland Bahner (2. Vorsitzender und Jugendleiter)"
          },
          { src: "pics/jhv_10/vorstand_erweitert.jpg", 
            title: "JHV 2010",
            description: "Hier mit im Bild Mannschaftsführer Stefan Frommherz und Jugendtrainer Jochen Bahner"
          },
          { src: "pics/jhv_10/sieger.jpg", 
            title: "JHV 2010",
            description: "Die Sieger der ersten Gruppe der Vereinsmeisterschaft wurden geehrt. Mit im Bild Adelheid Möltgen als Vertreterin des Gemeinderats."
          },
          { src: "pics/jhv_10/../presse/jhv_2010_sk.jpg", 
            title: "JHV 2010",
            description: "Und hier noch der Pressebericht im Südkurier vom 29.07.10. Die fünf Spalten wurden für die Darstellung auf drei zusammengefasst."
          },
        ],
      },
      {
        src: "pics/lakiso_10/lakiso10_01.jpg",
        title: "Lakiso 2010",
        children: [
          { src: "pics/lakiso_10/lakiso10_01.jpg", 
            title: "Lakiso 2010",
            description: "Wieder einmal wurde das Freibad vom Schach beherrscht."
          },
          { src: "pics/lakiso_10/lakiso10_02.jpg", 
            title: "Lakiso 2010",
            description: "Jochen und Rafael waren gute Anleiter. Heinz hielt sich im Hintergrund bereit,"
          },
          { src: "pics/lakiso_10/lakiso10_03.jpg", 
            title: "Lakiso 2010",
            description: "Nur ganz selten dachte ich, ich müsste auch einmal etwas sagen..."
          },
          { src: "pics/lakiso_10/lakiso10_04.jpg", 
            title: "Lakiso 2010",
            description: "Der zweite Tag war leider der einzige mit richtigem Badewetter..."
          },
          { src: "pics/lakiso_10/lakiso10_05.jpg", 
            title: "Lakiso 2010",
            description: "Bis zum Schluss wurde fleissig gearbeitet. Alle bestanden das Bauerndiplom!"
          },
          { src: "pics/lakiso_10/lakiso10_sk_0608.jpg", 
            title: "Lakiso 2010",
            description: "Und so berichtete die Presse (Südkurier vom 06.08.10)"
          },
        ],
      },
      {
        src: "pics/niko_09/niko09_01.jpg",
        title: "Nikolausblitz 2009",
        children: [
          { src: "pics/niko_09/niko09_01.jpg", 
            title: "Nikolausblitz 2009",
            description: "Zu unserem 40-jährigen Jubiläum war eigens Präsident Fritz Meyer angereist, um Siegfried auszuzeichnen. Hier vorher ein kurzer schachlicher Vergleich."
          },
          { src: "pics/niko_09/niko09_02.jpg", 
            title: "Nikolausblitz 2009",
            description: "Die drei ersten Plätze schnappte sich unsere Jugendabteilung: 1. Jochen (Mitte), 2. Tobias (links) und 3. Rafael"
          },
        ],
      },
      {
        src: "pics/jgp_09_laufenburg/jgp_09_lfbg_01.jpg",
        title: "BSH-JGP Laufenburg 09",
        children: [
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_01.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Zum ersten Mal ein JGP in der Hans-Thoma-Schule in Laufenburg"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_04.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: ""
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_02.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Beim Aufwärmen"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_03.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Begrüßung durch Wolfgang Scheina"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_05.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Harter Kampf in der U16/U18"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_06.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Daniel gegen Lukas"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_07.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Benno und Siegfried passen auf"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_08.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Interessierte Beobachter"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_09.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Manche Spiele zogen viele Zuschauer an"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_10.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Die Siegerehrung beginnt"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_12.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Jochen hatte die Preistische toll bestückt"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_13.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Ein stolzer Teilnehmer mit Urkunde und Sachpreis"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_14.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Am Ende fand auch noch die Siegerehrung für den Gesamtgrandprix 2009 statt"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_51.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Jochen und Tobi erhielten einen Pokal bei der Gesamtwertung"
          },
          { src: "pics/jgp_09_laufenburg/jgp_09_lfbg_50.jpg", 
            title: "BSH-JGP Laufenburg 09",
            description: "Gruppenbild der fortgeschrittenen Laufenburger Teilnehmer"
          },
        ],
      },
      {
        src: "pics/kortschnoi_09/kortschnoi_00.jpg",
        title: "Simultan Kortschnoi 09",
        children: [
          { src: "pics/kortschnoi_09/kortschnoi_00.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Schon die Vorbereitungen für das Turnier verliefen in entspannter Atmosphäre."
          },
          { src: "pics/kortschnoi_09/kortschnoi_01.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Bürgermeister Krieger begrüßt unsere Gäste."
          },
          { src: "pics/kortschnoi_09/kortschnoi_02.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Bürgermeister Krieger überreicht GM Kortschnoi einen Bildband über Laufenburg."
          },
          { src: "pics/kortschnoi_09/kortschnoi_03.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Viktor Kortschnoi erzählt kurz sein Schachleben."
          },
          { src: "pics/kortschnoi_09/kortschnoi_04.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Die Partieformulare wurden signiert..."
          },
          { src: "pics/kortschnoi_09/kortschnoi_05.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "und dann ging's an den 23 besetzten Brettern auch schon los."
          },
          { src: "pics/kortschnoi_09/kortschnoi_06.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Von der Presse festgehalten wurde der erste Zug an Brett 1 von Bürgermeister Krieger."
          },
          { src: "pics/kortschnoi_09/kortschnoi_07.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Der Webmaster wird kritisch beäugt von seinem jüngsten Sohn."
          },
          { src: "pics/kortschnoi_09/kortschnoi_08.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Hermann, Siegfried, Benno und Frau Witt (von links)."
          },
          { src: "pics/kortschnoi_09/kortschnoi_09.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Wolfgang notiert seinen letzten Zug, Bernhard schaut interessiert zu."
          },
          { src: "pics/kortschnoi_09/k098.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Interessante Perspektive (Dank an Markus Haag für das Bild)."
          },
          { src: "pics/kortschnoi_09/kortschnoi_10.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Gegen den Brombacher Gregor Haag tat sich Kortschnoi von Anfang an schwer..."
          },
          { src: "pics/kortschnoi_09/k099.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "und musste später die einzige Niederlage in Kauf nehmen."
          },
          { src: "pics/kortschnoi_09/kortschnoi_11.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Auch Jochen hatte eine interessante (und letztendlich auch lange) Partie."
          },
          { src: "pics/kortschnoi_09/kortschnoi_12.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Alt aber fit..."
          },
          { src: "pics/kortschnoi_09/kortschnoi_13.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Am Ende durfte sich Viktor Kortschnoi bei der letzten Partie noch setzen."
          },
          { src: "pics/kortschnoi_09/kortschnoi_14.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Sichtlich froh, dass er die letzte Partie gegen Jochen dann doch noch gewonnen hat..."
          },
          { src: "pics/kortschnoi_09/kortschnoi_15.jpg", 
            title: "Simultan Kortschnoi 09",
            description: "Rechts neben Kortschnoi der einzige Sieger Gregor Haag und die drei Remisierer."
          },
        ],
      },
      {
        src: "pics/tdoft09/tdoft09_01.jpg",
        title: "Tag der offenen Tür 09",
        children: [
          { src: "pics/tdoft09/tdoft09_01.jpg", 
            title: "Tag der offenen Tür 09",
            description: "Unser Stargast an diesem Tag war IM Ali Habibi."
          },
          { src: "pics/tdoft09/tdoft09_02.jpg", 
            title: "Tag der offenen Tür 09",
            description: "Auch die Großen waren vom Training beeindruckt..."
          },
          { src: "pics/tdoft09/tdoft09_03.jpg", 
            title: "Tag der offenen Tür 09",
            description: "... und knobelten eifrig mit an der Lösung einiger Schachaufgaben."
          },
          { src: "pics/tdoft09/tdoft09_04.jpg", 
            title: "Tag der offenen Tür 09",
            description: "Die Anfänger durften eine Partie gegen Ali spielen..."
          },
          { src: "pics/tdoft09/tdoft09_05.jpg", 
            title: "Tag der offenen Tür 09",
            description: "... und waren anschließend ganz stolz."
          },
          { src: "pics/tdoft09/tdoft09_06.jpg", 
            title: "Tag der offenen Tür 09",
            description: "Vor der Mittagspause analysierte Ali noch eine seiner Partien für uns."
          },
          { src: "pics/tdoft09/tdoft09_07.jpg", 
            title: "Tag der offenen Tür 09",
            description: "Mit etwas Verspätung ging es dann an die Bretter zum Blitzturnier."
          },
          { src: "pics/tdoft09/tdoft09_08.jpg", 
            title: "Tag der offenen Tür 09",
            description: "Die Köpfe rauchten auch bei unseren beiden Gästen."
          },
          { src: "pics/tdoft09/tdoft09_09.jpg", 
            title: "Tag der offenen Tür 09",
            description: "Mit Spaß und Freude wurde um jeden Punkt gekämpft."
          },
          { src: "pics/tdoft09/tdoft09_10.jpg", 
            title: "Tag der offenen Tür 09",
            description: "Auch Ali, der außer Konkurrenz mitspielte, musste ab und zu richtig nachdenken."
          },
        ],
      },
      {
        src: "pics/lakiso_09/lakiso09_01.jpg",
        title: "Lakiso 2009",
        children: [
          { src: "pics/lakiso_09/lakiso09_01.jpg", 
            title: "Lakiso 2009",
            description: "13 Kinder hatten sich angemeldet, 12 waren gekommen."
          },
          { src: "pics/lakiso_09/lakiso09_02.jpg", 
            title: "Lakiso 2009",
            description: "Erstmalig wurde der Brackeler Schachlehrgang eingesetzt."
          },
          { src: "pics/lakiso_09/lakiso09_03.jpg", 
            title: "Lakiso 2009",
            description: "Spiel und Spass standen natürlich auch dieses Jahr wieder im Vordergrund.."
          },
          { src: "pics/lakiso_09/lakiso09_04.jpg", 
            title: "Lakiso 2009",
            description: "Zwischendurch wurde allerdings auch richtig gelernt!"
          },
          { src: "pics/lakiso_09/lakiso09_05.jpg", 
            title: "Lakiso 2009",
            description: "Heinz und Hermann betrachten das Geschehen vom Rande."
          },
          { src: "pics/lakiso_09/lakiso09_06.jpg", 
            title: "Lakiso 2009",
            description: "Dann wurde es plötzlich ernst: Das Bauerndiplom war angesagt!"
          },
          { src: "pics/lakiso_09/lakiso09_07.jpg", 
            title: "Lakiso 2009",
            description: "Die Köpfe rauchten bei hochsommerlichem Wetter."
          },
          { src: "pics/lakiso_09/lakiso09_08.jpg", 
            title: "Lakiso 2009",
            description: "Am Ende hatten alle das Klassenziel erreicht: Das Bauerndiplom wird ausgehändigt."
          },
        ],
      },
      {
        src: "pics/jhv_09/jhv09_01.jpg",
        title: "JHV 2009",
        children: [
          { src: "pics/jhv_09/jhv09_01.jpg", 
            title: "JHV 2009",
            description: "Bürgermeister Krieger (im Gespräch mit Pressevertreter Herrn Kerkhoff) war unserer Einladung gerne gefolgt."
          },
          { src: "pics/jhv_09/jhv09_02.jpg", 
            title: "JHV 2009",
            description: "Auch einige unserer Jugendspieler waren anwesend. Drei von ihnen durften ja auch schon mit abstimmen."
          },
          { src: "pics/jhv_09/jhv09_03.jpg", 
            title: "JHV 2009",
            description: "Bürgermeister Krieger war des Lobes voll und überreichte uns zu unserem 40-jährigen Jubiläum eine Zuwendung der Stadt Laufenburg in Höhe von 200 €."
          },
          { src: "pics/jhv_09/jhv09_04.jpg", 
            title: "JHV 2009",
            description: "Wolfgang Scheina erhielt die Treuenadel des Badischen Schachverbands für 25-jährige Verbandszugehörigkeit."
          },
          { src: "pics/jhv_09/jhv09_05.jpg", 
            title: "JHV 2009",
            description: "Daniel Bahner siegte in der Gruppe U16."
          },
          { src: "pics/jhv_09/jhv09_06.jpg", 
            title: "JHV 2009",
            description: "Tobias Oelschlegel wurde Sieger in der Gruppe U18."
          },
          { src: "pics/jhv_09/jhv09_07.jpg", 
            title: "JHV 2009",
            description: "Jochen Bahner erhielt einen Fairnesspokal für dieses Turnier."
          },
          { src: "pics/jhv_09/jhv09_08a.jpg", 
            title: "JHV 2009",
            description: "Wolfgang Scheina verteilte anschließend Urkunden und Pokale für die Vereinsmeisterschaft."
          },
          { src: "pics/jhv_09/jhv09_08b.jpg", 
            title: "JHV 2009",
            description: "In der Gruppe 2 belegte Holger Kutzsche (linkes Bild) den 3. Platz, Elmar Kohlhöfer (rechtes Bild) wurde Zweiter."
          },
          { src: "pics/jhv_09/jhv09_09.jpg", 
            title: "JHV 2009",
            description: "Jochen Bahner als stolzer Sieger der Gruppe 2."
          },
          { src: "pics/jhv_09/jhv09_10a.jpg", 
            title: "JHV 2009",
            description: "Der 3. Platz in der Gruppe 1 ging an Wolfgang Scheine"
          },
          { src: "pics/jhv_09/jhv09_10b.jpg", 
            title: "JHV 2009",
            description: "Zweiter in dieser Gruppe wurde Roland Bahner"
          },
          { src: "pics/jhv_09/jhv09_11.jpg", 
            title: "JHV 2009",
            description: "Strahlender Sieger der Gruppe 1 wurde Stefan Frommherz."
          },
        ],
      },
      {
        src: "pics/thun_09/panorama01_640.jpg",
        title: "Schachcamp Thun 2009",
        children: [
          { src: "pics/thun_09/panorama01_640.jpg", 
            title: "Schachcamp Thun 2009",
            description: "Der Thuner See ist einfach eine beeindruckende Kuliss!"
          },
          { src: "pics/thun_09/thun09_01.jpg", 
            title: "Schachcamp Thun 2009",
            description: "Der morgendliche Blick aus unserer Unterkunft."
          },
          { src: "pics/thun_09/thun09_03.jpg", 
            title: "Schachcamp Thun 2009",
            description: "Markus Haag erklärt die Regeln für den Spielemehrkampf."
          },
          { src: "pics/thun_09/thun09_04.jpg", 
            title: "Schachcamp Thun 2009",
            description: "Turmbauen war eine beliebte Disziplin."
          },
          { src: "pics/thun_09/thun09_06.jpg", 
            title: "Schachcamp Thun 2009",
            description: "Auch Tandem gehörte zum Mehrkampf."
          },
          { src: "pics/thun_09/thun09_05.jpg", 
            title: "Schachcamp Thun 2009",
            description: "Alle waren froh und zufrieden."
          },
          { src: "pics/thun_09/thun09_07.jpg", 
            title: "Schachcamp Thun 2009",
            description: "Ein Blitzturnier durfte natürlich nicht fehlen."
          },
          { src: "pics/thun_09/thun09_08.jpg", 
            title: "Schachcamp Thun 2009",
            description: "Ali Habibi mit seinen Schützlingen."
          },
          { src: "pics/thun_09/thun09_09.jpg", 
            title: "Schachcamp Thun 2009",
            description: "Hier nochmals Ali, diesmal nur mit den Laufenburgern. Dank wieder einmal an Markus Haag für die perfekte Organisation und das freundliche Überlassen einiger Bilder."
          },
        ],
      },
      {
        src: "pics/jugend_heitersheim09/hei09_01.jpg",
        title: "Arkadenturnier Heitersheim",
        children: [
          { src: "pics/jugend_heitersheim09/hei09_01.jpg", 
            title: "Arkadenturnier Heitersheim",
            description: "Hier das Abschlussbild mit dem Pokal und den Preisen."
          },
          { src: "pics/jugend_heitersheim09/hei09_02.jpg", 
            title: "Arkadenturnier Heitersheim",
            description: "Eine wunderschöne Atmosphäre herrschte im Hof des Malteserschlosses."
          },
          { src: "pics/jugend_heitersheim09/hei09_03.jpg", 
            title: "Arkadenturnier Heitersheim",
            description: "Für unsere Anfänger (rechts Valentin, 2.v.r. Jan) war es das allererste Schachturnier."
          },
          { src: "pics/jugend_heitersheim09/hei09_05.jpg", 
            title: "Arkadenturnier Heitersheim",
            description: "Konzentration, Durchhaltevermögen und Spass am Spielen zeichneten alle aus. Hier Julian (hinten links)"
          },
          { src: "pics/jugend_heitersheim09/hei09_04.jpg", 
            title: "Arkadenturnier Heitersheim",
            description: "Auch unsere Fortgeschrittenen, hier Nicolas (links) und Lukas, hatten Spass."
          },
          { src: "pics/jugend_heitersheim09/hei09_06.jpg", 
            title: "Arkadenturnier Heitersheim",
            description: "Jochen, der spätere Sieger der U16, und Rafael, der nur zweitlpatzierte in der U18, bei der Arbeit."
          },
          { src: "pics/jugend_heitersheim09/hei09_07.jpg", 
            title: "Arkadenturnier Heitersheim",
            description: "Selten nur mussten die Schiedsrichter zu Hilfe gerufen werden.."
          },
          { src: "pics/jugend_heitersheim09/hei09_08.jpg", 
            title: "Arkadenturnier Heitersheim",
            description: "Am Ende waren alle erschöpft aber zufrieden."
          },
        ],
      },
      {
        src: "pics/jgp_09_geisingen/jgpgeis09_01.jpg",
        title: "BSH-JGP Geisingen 09",
        children: [
          { src: "pics/jgp_09_geisingen/jgpgeis09_01.jpg", 
            title: "BSH-JGP Geisingen 09",
            description: "Wieder einmal in der Schule in Geisingen"
          },
          { src: "pics/jgp_09_geisingen/jgpgeis09_02.jpg", 
            title: "BSH-JGP Geisingen 09",
            description: "Jojo kämpft um jeden Punkt"
          },
          { src: "pics/jgp_09_geisingen/jgpgeis09_03.jpg", 
            title: "BSH-JGP Geisingen 09",
            description: "Wieder kam es zum Lokalderby Jochen gegen Tobias"
          },
          { src: "pics/jgp_09_geisingen/jgpgeis09_04.jpg", 
            title: "BSH-JGP Geisingen 09",
            description: "Mit Digitaluhr hätte ich ihn diesmal besiegt! Mit Digitaluhr hätte ich ihn diesmal besiegt!"
          },
          { src: "pics/jgp_09_geisingen/jgpgeis09_05.jpg", 
            title: "BSH-JGP Geisingen 09",
            description: "Wenigstens einer freut sich!"
          },
        ],
      },
      {
        src: "pics/u20_mannsch_09/u20_m_09_01.jpg",
        title: "U20-Mannschafts meisterschaft 09",
        children: [
          { src: "pics/u20_mannsch_09/u20_m_09_01.jpg", 
            title: "U20-Mannschaftsmeisterschaft 09",
            description: "Beim 1. Spiel gegen Brombach II"
          },
          { src: "pics/u20_mannsch_09/u20_m_09_02.jpg", 
            title: "U20-Mannschaftsmeisterschaft 09",
            description: "Im 3. Spiel gegen Brombach I waren die Mienen schon angespannter."
          },
          { src: "pics/u20_mannsch_09/u20_m_09_03.jpg", 
            title: "U20-Mannschaftsmeisterschaft 09",
            description: "Am Ende wurde es Platz 3!"
          },
        ],
      },
      {
        src: "pics/stadtjumeiloe09/stadtjumeiloe09_01.jpg",
        title: "Stadtjugendmeisterschaft Lörrach 09",
        children: [
          { src: "pics/stadtjumeiloe09/stadtjumeiloe09_01.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 09",
            description: "Wieder war das Alte Wasserwerk in Lörrach eine schöne Kulisse."
          },
          { src: "pics/stadtjumeiloe09/stadtjumeiloe09_02.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 09",
            description: "Die älteren spielten dieses Mal im oberen Stock."
          },
          { src: "pics/stadtjumeiloe09/stadtjumeiloe09_03.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 09",
            description: "Anstrengende Partien."
          },
          { src: "pics/stadtjumeiloe09/stadtjumeiloe09_04.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 09",
            description: "Am Ende freut sich Jochen mit Rafael."
          },
        ],
      },
      {
        src: "pics/bjem09/bjem09_01.jpg",
        title: "BJEM 2009",
        children: [
          { src: "pics/bjem09/bjem09_01.jpg", 
            title: "BJEM 2009",
            description: "Turnierbeginn in der U16"
          },
          { src: "pics/bjem09/bjem09_02.jpg", 
            title: "BJEM 2009",
            description: "Daniel wurde in der 1. Runde nicht richtig glücklich"
          },
          { src: "pics/bjem09/bjem09_03.jpg", 
            title: "BJEM 2009",
            description: "Im Analyseraum konnte man sich beim Tandem zerstreuen"
          },
          { src: "pics/bjem09/bjem09_04.jpg", 
            title: "BJEM 2009",
            description: "Am ersten Tag gab es Abends auch ein Kennenlern-Tandem"
          },
          { src: "pics/bjem09/bjem09_06.jpg", 
            title: "BJEM 2009",
            description: "Jochen und Daniel, gemeinsam mit Gregor Haag vom befreundeten Schachclub Brombach beim analysieren"
          },
          { src: "pics/bjem09/bjem09_07.jpg", 
            title: "BJEM 2009",
            description: "Die Siegerehrung fand im Rahmen der Jahresversammlung der Schachjugend Baden statt"
          },
          { src: "pics/bjem09/bjem09_08.jpg", 
            title: "BJEM 2009",
            description: "Auch der BSV-Präsident Fritz Meyer (links) war anwesend."
          },
        ],
      },
      {
        src: "pics/niko_08/niko08_01.jpg",
        title: "Nikolausblitz 2008",
        children: [
          { src: "pics/niko_08/niko08_01.jpg", 
            title: "Nikolausblitz 2008",
            description: "Und wieder mal war ein Kleiner Imbiss zu Beginn Mittelpunkt des Geschehens."
          },
          { src: "pics/niko_08/niko08_03.jpg", 
            title: "Nikolausblitz 2008",
            description: "Alle ließen es sich schmecken."
          },
          { src: "pics/niko_08/niko08_02.jpg", 
            title: "Nikolausblitz 2008",
            description: "Danach wurde zum ersten Mal der neue Wanderpokal, gestiftet von der SV-Versicherungsagentur Murg, Bürgin & Partner, von unserem Spielleiter Wolfgang Scheina verliehen."
          },
          { src: "pics/niko_08/niko08_04.jpg", 
            title: "Nikolausblitz 2008",
            description: "Thomas war ob des 3. Platzes ein wenig unscharf. Bahni als 2. schon glücklicher."
          },
          { src: "pics/niko_08/niko08_05.jpg", 
            title: "Nikolausblitz 2008",
          },
          { src: "pics/niko_08/niko08_06.jpg", 
            title: "Nikolausblitz 2008",
            description: "Sieger Stefan erhielt den Turnier- und den Wanderpokal."
          },
          { src: "pics/niko_08/niko08_07.jpg", 
            title: "Nikolausblitz 2008",
            description: ""
          },
          { src: "pics/niko_08/niko08_08.jpg", 
            title: "Nikolausblitz 2008",
            description: "So sehen Sieger aus!"
          },
          { src: "pics/niko_08/niko08_09.jpg", 
            title: "Nikolausblitz 2008",
            description: "Anschließend ging es hurtig an die Bretter zum Nikolausblitz."
          },
          { src: "pics/niko_08/niko08_10.jpg", 
            title: "Nikolausblitz 2008",
            description: "Immer wieder wurde die Tabelle analysiert."
          },
          { src: "pics/niko_08/niko08_11.jpg", 
            title: "Nikolausblitz 2008",
            description: "Gegen Schluss waren alle etwas entspannter."
          },
          { src: "pics/niko_08/niko08_12.jpg", 
            title: "Nikolausblitz 2008",
            description: "Bernhard (Mitte) gewann knapp, gefolgt von Wolfgang (links) und Stefan."
          },
        ],
      },
      {
        src: "pics/jugendbezmeist08/jubez08_01.jpg",
        title: "Jugend-Bezirksmeisterschaft 08",
        children: [
          { src: "pics/jugendbezmeist08/jubez08_01.jpg", 
            title: "Jugend-Bezirksmeisterschaft 08",
            description: "An altgewohnter Stelle, dem Aufenthaltsraum des Hochrhein-Gymnasiums, wurde in mehreren Gruppen um die Meisterschaften gekämpft."
          },
          { src: "pics/jugendbezmeist08/jubez08_02.jpg", 
            title: "Jugend-Bezirksmeisterschaft 08",
            description: "Jochen und Rafael analysieren."
          },
          { src: "pics/jugendbezmeist08/jubez08_03.jpg", 
            title: "Jugend-Bezirksmeisterschaft 08",
            description: "Die Sieger der U14 Daniel"
          },
          { src: "pics/jugendbezmeist08/jubez08_04.jpg", 
            title: "Jugend-Bezirksmeisterschaft 08",
            description: "Die Sieger der U16 Jochen"
          },
          { src: "pics/jugendbezmeist08/jubez08_05.jpg", 
            title: "Jugend-Bezirksmeisterschaft 08",
            description: "Lukas erkämpfte sich den 5. Platz in der U14"
          },
          { src: "pics/jugendbezmeist08/jubez08_07.jpg", 
            title: "Jugend-Bezirksmeisterschaft 08",
            description: "Rafael wurde 3. in der U18"
          },
          { src: "pics/jugendbezmeist08/jubez08_06.jpg", 
            title: "Jugend-Bezirksmeisterschaft 08",
            description: "Tobias beendete die U18 als 2."
          },
          { src: "pics/jugendbezmeist08/jubez08_08.jpg", 
            title: "Jugend-Bezirksmeisterschaft 08",
            description: "Nicolas haderte in der U16 mit seinem Schicksal."
          },
          { src: "pics/jugendbezmeist08/jubez08_09.jpg", 
            title: "Jugend-Bezirksmeisterschaft 08",
            description: "Die strahlenden Sieger aller Gruppen."
          },
        ],
      },
      {
        src: "pics/thun_08/thun08_01.jpg",
        title: "Schachcamp Thun 2008",
        children: [
          { src: "pics/thun_08/thun08_01.jpg", 
            title: "Schachcamp Thun 2008",
            description: "Massen von schach- und esswilligen Menschen waren zusammengekommen."
          },
          { src: "pics/thun_08/thun08_03.jpg", 
            title: "Schachcamp Thun 2008",
            description: "Die Profigruppe beim Schachtraining."
          },
          { src: "pics/thun_08/thun_08_b4.jpg", 
            title: "Schachcamp Thun 2008",
            description: "Hier aus der Sicht eines Teilnehmers."
          },
          { src: "pics/thun_08/thun08_02.jpg", 
            title: "Schachcamp Thun 2008",
            description: "Zwischendurch gab es auch noch ein Minigolfturnier..."
          },
          { src: "pics/thun_08/thun_08_b1.jpg", 
            title: "Schachcamp Thun 2008",
            description: "... bei dem die Laufenburger kräftig abräumten"
          },
          { src: "pics/thun_08/thun_08_b2.jpg", 
            title: "Schachcamp Thun 2008",
            description: ""
          },
          { src: "pics/thun_08/thun_08_b3.jpg", 
            title: "Schachcamp Thun 2008",
            description: ""
          },
          { src: "pics/thun_08/thun08_04.jpg", 
            title: "Schachcamp Thun 2008",
            description: "Ali Habibi war frohgemut ob des Lerneifers seiner Schützlinge."
          },
          { src: "pics/thun_08/thun08_05.jpg", 
            title: "Schachcamp Thun 2008",
            description: "Bei dieser tollen Aussicht liessen wir es uns gutgehen. Dank noch an Markus Haag für die perfekte Organisation und das freundliche Überlassen einiger seiner Bilder."
          },
        ],
      },
      {
        src: "pics/lakiso_08/lakiso08_01.jpg",
        title: "Lakiso 2008",
        children: [
          { src: "pics/lakiso_08/lakiso08_01.jpg", 
            title: "Lakiso 2008",
            description: "15 Kinder hatten sich angemeldet, 13 waren gekommen. Die Presse (im Hintergrund im Gespräch mit mir) war begeistert." 
          },
          { src: "pics/lakiso_08/lakiso08_02.jpg", 
            title: "Lakiso 2008",
            description: "Schach, Baden und Chips - eine interessante Kombination..." 
          },
          { src: "pics/lakiso_08/lakiso08_03.jpg", 
            title: "Lakiso 2008",
            description: "Hermann zeigt eindrücklich, wo der Fehler geschah." 
          },
          { src: "pics/lakiso_08/lakiso08_04.jpg", 
            title: "Lakiso 2008",
            description: "Die Grundlagen der Eröffnung ..." 
          },
          { src: "pics/lakiso_08/lakiso08_05.jpg", 
            title: "Lakiso 2008",
            description: "wurden von den Kids interessiert aufgenommen ..." 
          },
          { src: "pics/lakiso_08/lakiso08_06.jpg", 
            title: "Lakiso 2008",
            description: "und von Wolfgang noch etwas verfeinert." 
          },
          { src: "pics/lakiso_08/lakiso08_07.jpg", 
            title: "Lakiso 2008",
            description: "Abschlussgruppenbild (mit den Enkeln des Bademeisters)" 
          },
          { src: "pics/lakiso_08/lakiso_08_sk_010808.jpg", 
            title: "Lakiso 2008",
            description: "Und das meinte die Presse" 
          },
        ],
      },
      {
        src: "pics/jhv_08/jhv08_1.jpg",
        title: "JHV 2008",
        children: [
          { src: "pics/jhv_08/jhv08_1.jpg", 
            title: "JHV 2008",
            description: "Gut besucht war die Jahreshauptversammlung auch durch die Anwesenheit vieler Jugendspieler."
          },
          { src: "pics/jhv_08/jhv08_2.jpg", 
            title: "JHV 2008",
            description: "Der Vorstand berichtete über die abgelaufene Saison."
          },
          { src: "pics/jhv_08/jhv08_3.jpg", 
            title: "JHV 2008",
            description: "Alle Jugendspieler erhielten für ihre Teilnahme an den Jugendvereinsmeisterschaften zumindest eine Medaille."
          },
          { src: "pics/jhv_08/jhv08_4.jpg", 
            title: "JHV 2008",
            description: "Rafael Sterzik wurde 3. der Gruppe 2 der Vereinsmeisterschaft und 3. der Gruppe U17 der Jugendvereinsmeisterschaft."
          },
          { src: "pics/jhv_08/jhv08_5.jpg", 
            title: "JHV 2008",
            description: "Elmar Kohlhöfer (2. Platz Gruppe 2 der Vereinsmeisterschaft)"
          },
          { src: "pics/jhv_08/jhv08_6.jpg", 
            title: "JHV 2008",
            description: "Neuer (und alter) Vereinsmeister 2008: Dr. Thomas Schmidt"
          },
          { src: "pics/jhv_08/jhv08_7.jpg", 
            title: "JHV 2008",
            description: "Zum Abschluss versammelten sich alle Pokal- und Medaillengewinner zu einem Gruppenfoto."
          },
        ],
      },
      {
        src: "pics/jgp_08_geisingen/jgpgeis08_01.jpg",
        title: "BSH-JGP Geisingen 08",
        children: [
          { src: "pics/jgp_08_geisingen/jgpgeis08_01.jpg", 
            title: "BSH-JGP Geisingen 08",
            description: "Daniel beim ersten Spiel in der U12"
          },
          { src: "pics/jgp_08_geisingen/jgpgeis08_03.jpg", 
            title: "BSH-JGP Geisingen 08",
            description: "In der U16 gab es einige Lokalderbys -hier Jochen gegen Tobias"
          },
          { src: "pics/jgp_08_geisingen/jgpgeis08_04.jpg", 
            title: "BSH-JGP Geisingen 08",
            description: "Lukas hatte gleich zu Beginn einen schweren Gegner"
          },
          { src: "pics/jgp_08_geisingen/jgpgeis08_05.jpg", 
            title: "BSH-JGP Geisingen 08",
            description: "Daniel holte aus den ersten 5 Spielen 4,5 Punkte, aber dann liess er doch etwas nach..."
          },
          { src: "pics/jgp_08_geisingen/jgpgeis08_06.jpg", 
            title: "BSH-JGP Geisingen 08",
            description: "Turnieratmosphäre im Raum U18/U16/U14"
          },
          { src: "pics/jgp_08_geisingen/jgpgeis08_07.jpg", 
            title: "BSH-JGP Geisingen 08",
            description: "Lukas als stolzer Zweiter in der U14"
          },
          { src: "pics/jgp_08_geisingen/jgpgeis08_08.jpg", 
            title: "BSH-JGP Geisingen 08",
            description: "Daniel reichte es am Schluss nur zu Platz 3 in der U12"
          },
        ],
      },
      {
        src: "pics/stadtjumeiloe08/stadtjumeiloe_01.jpg",
        title: "Stadtjugendmeisterschaft Lörrach 08",
        children: [
          { src: "pics/stadtjumeiloe08/stadtjumeiloe_01.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 08",
            description: "Beim Warmspielen im Alten Wasserwerk Lörrach"
          },
          { src: "pics/stadtjumeiloe08/stadtjumeiloe_02.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 08",
          },
          { src: "pics/stadtjumeiloe08/stadtjumeiloe_03.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 08",
            description: "Beim Lokalderby: Tobias gegen Jochen"
          },
          { src: "pics/stadtjumeiloe08/stadtjumeiloe_04.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 08",
            description: "Bitte nicht forografieren!"
          },
          { src: "pics/stadtjumeiloe08/stadtjumeiloe_05.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 08",
            description: "Lukas und Nicolas kämpften in der U14"
          },
          { src: "pics/stadtjumeiloe08/stadtjumeiloe_06.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 08",
            description: "Marvin und Lukas bewundern Nicolas beim Siegen"
          },
          { src: "pics/stadtjumeiloe08/stadtjumeiloe_08.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 08",
            description: "Auch hier wieder der Klassiker: Jochen gegen Gregor Haag"
          },
          { src: "pics/stadtjumeiloe08/stadtjumeiloe_07.jpg", 
            title: "Stadtjugendmeisterschaft Lörrach 08",
            description: "Das Alte Wasserwerk war gut gefüllt..."
          },
        ],
      },
      {
        src: "pics/majufinale08/majufinale08_01.jpg",
        title: "Mannschafts jugendmeisterschaft",
        children: [
          { src: "pics/majufinale08/majufinale08_01.jpg", 
            title: "Mannschaftsjugendmeisterschaft",
            description: "Die erste Mannschaft in Aktion."
          },
          { src: "pics/majufinale08/majufinale08_02.jpg", 
            title: "Mannschaftsjugendmeisterschaft",
            description: "Auch die zweite kämpfte tapfer."
          },
          { src: "pics/majufinale08/majufinale08_03.jpg", 
            title: "Mannschaftsjugendmeisterschaft",
            description: "Die dritte mit überraschenden Erfolgen."
          },
          { src: "pics/majufinale08/majufinale08_03b.jpg", 
            title: "Mannschaftsjugendmeisterschaft",
            description: "Ein ungleiches Paar."
          },
          { src: "pics/majufinale08/majufinale08_04.jpg", 
            title: "Mannschaftsjugendmeisterschaft",
            description: "Lokalderby: Erste gegen zweite (Brett 1 und 2)"
          },
          { src: "pics/majufinale08/majufinale08_05.jpg", 
            title: "Mannschaftsjugendmeisterschaft",
            description: "Lokalderby: Erste gegen zweite (Brett 3 und 4)"
          },
          { src: "pics/majufinale08/majufinale08_06.jpg", 
            title: "Mannschaftsjugendmeisterschaft",
            description: "Die dritte gewann mit dem 1. Platz den Blumentopf in der Gruppe B."
          },
          { src: "pics/majufinale08/majufinale08_07.jpg", 
            title: "Mannschaftsjugendmeisterschaft",
            description: "Und hier die im wahrsten Sinne des Wortes strahlenden Sieger der Gruppe A."
          },
        ],
      },
      {
        src: "pics/bjem08/bjem08_01.jpg",
        title: "Daniel bei der BJEM 2008",
        children: [
          { src: "pics/bjem08/bjem08_01.jpg", 
            title: "Daniel bei der BJEM 2008",
            description: "Nach der Rochade"
          },
          { src: "pics/bjem08/bjem08_02.jpg", 
            title: "Daniel bei der BJEM 2008",
            description: "Turnieratmosphäre in Neuenbürg"
          },
          { src: "pics/bjem08/bjem08_03.jpg", 
            title: "Daniel bei der BJEM 2008",
            description: "Es musste mitgeschrieben werden, dafür gab's auch eine DWZ-Auswertung!"
          },
          { src: "pics/bjem08/bjem08_04.jpg", 
            title: "Daniel bei der BJEM 2008",
            description: "Am Schluß eine kleine Stärkung. Daniel wurde 21. von 33 in der U12"
          },
        ],
      },
      {
        src: "pics/niko_07/niko07_01.jpg",
        title: "Nikolausblitz 2007",
        children: [
          { src: "pics/niko_07/niko07_01.jpg", 
            title: "Nikolausblitz 2007",
            description: "Die Teilnehmer trudeln ein..."
          },
          { src: "pics/niko_07/niko07_02.jpg", 
            title: "Nikolausblitz 2007",
            description: "Die Presse in Gestalt von Frau Fröse macht ein Bild"
          },
          { src: "pics/niko_07/niko07_03.jpg", 
            title: "Nikolausblitz 2007",
            description: "Die ersten zwei Plätze des Sommerpokalturniers: Bernhard Bürgin, der den Wanderpokal nach 3-maligem Sieg dauerhaft mit nach Hause nimmt, und Stefan Frommherz (der drittplazierte Thomas Schmidt fehlte leider). Jochen und Daniel Bahner präsentieren stolz ihre Pokale des Bodensee-Schwarzwald-Hochrhrein Jugendgrandprix, bei dem sie nach der Gesamtwertung jeweils den 3. Platz in der U14 bzw. U12 belegten."
          },
          { src: "pics/niko_07/niko07_04.jpg", 
            title: "Nikolausblitz 2007",
            description: "Das Nikolausblitzturnier beginnt."
          },
          { src: "pics/niko_07/niko07_05.jpg", 
            title: "Nikolausblitz 2007",
            description: "Bei hervorragender Bewirtung wurde hart gekämpft."
          },
          { src: "pics/niko_07/niko07_06.jpg", 
            title: "Nikolausblitz 2007",
            description: "Es waren drei Entscheidungsspiele um Platz 2 nötig..."
          },
          { src: "pics/niko_07/niko07_07.jpg", 
            title: "Nikolausblitz 2007",
            description: "Zu guter letzt gewann Stefan Frommherz (mitte) das Turnier vor Bernhard Bürgin (rechts) und Roland Bahner (links)."
          },
          { src: "pics/niko_07/niko07_08.jpg", 
            title: "Nikolausblitz 2007",
          },
        ],
      },
      {
        src: "pics/jgp_07_donau/jgp_donau_01.jpg",
        title: "BSH-JGP Donaueschingen 07",
        children: [
          { src: "pics/jgp_07_donau/jgp_donau_01.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Nicolas hat schon in der 1. Runde eine harte Nuss zu knacken..."
          },
          { src: "pics/jgp_07_donau/jgp_donau_02.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Jochen mit spirituellem Beistand durch Hermann Knütel."
          },
          { src: "pics/jgp_07_donau/jgp_donau_03.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Turnieratmosphäre in der Spielgruppe U16 / U14"
          },
          { src: "pics/jgp_07_donau/jgp_donau_04.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Daniel traut seinen Augen nicht: Schon wieder in unter 3 Minuten gewonnen..."
          },
          { src: "pics/jgp_07_donau/jgp_donau_05.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Hier ist Daniel schon etwas konzentrierter."
          },
          { src: "pics/jgp_07_donau/jgp_donau_06.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "So langsam ist er gut drauf: Nur noch wenige Punkte fehlen zum Turniersieg!"
          },
          { src: "pics/jgp_07_donau/jgp_donau_07.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Tobias und Jojo im Quasi-Lokalderby."
          },
          { src: "pics/jgp_07_donau/jgp_donau_08.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Auch Jochen kämpft gegen Thomas Jakobsche vergebens."
          },
          { src: "pics/jgp_07_donau/jgp_donau_09.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Frauenpower gegen Nicolas."
          },
          { src: "pics/jgp_07_donau/jgp_donau_11.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Schwierige Eröffnung?"
          },
          { src: "pics/jgp_07_donau/jgp_donau_12.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Jojo in höchster Konzentration."
          },
          { src: "pics/jgp_07_donau/jgp_donau_13.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Schon etwas gelassener: Der Klassiker Gregor Haag - Jochen Bahner."
          },
          { src: "pics/jgp_07_donau/jgp_donau_14.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Daniel holt mit vollem Mund und Konzentration den letzten entscheidenden Punkt zum Turniersieg in der U12."
          },
          { src: "pics/jgp_07_donau/ehrung_u16.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Tobias (links) als 3. in der U16"
          },
          { src: "pics/jgp_07_donau/ehrung_u14.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Jochen (rechts) als 3. in der U14"
          },
          { src: "pics/jgp_07_donau/ehrung_u12.jpg", 
            title: "BSH-JGP Donaueschingen 07",
            description: "Daniel (links) als 3. in der U12"
          },
        ],
      },
      {
        src: "pics/pokal2007/pokbrombach07_01.jpg",
        title: "Bezirkspokal 2007",
        children: [
          { src: "pics/pokal2007/pokbrombach07_01.jpg", 
            title: "Bezirkspokal 2007",
            description: "In unserem Ausweichlokal Linde sind die Köpfe am Rauchen..."
          },
          { src: "pics/pokal2007/pokbrombach07_02.jpg", 
            title: "Bezirkspokal 2007",
            description: "Noch steht es Remis (0:0)"
          },
          { src: "pics/pokal2007/pokbrombach07_03.jpg", 
            title: "Bezirkspokal 2007",
            description: "Aber die ersten Zuschauer gehen schon."
          },
          { src: "pics/pokal2007/pokbrombach07_04.jpg", 
            title: "Bezirkspokal 2007",
            description: "Mit einem 0,5:3,5 haben wir uns etwas unter unserem Wert verkauft..."
          },
        ],
      },
      {
        src: "pics/jugendbezmeist07/bjm07_03.jpg",
        title: "Jugend-Bezirksmeisterschaft 07",
        children: [
          { src: "pics/jugendbezmeist07/bjm07_03.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Wieder mal Turnieratmosphäre in Waldshut. Diesmal in der Realschule."
          },
          { src: "pics/jugendbezmeist07/bjm07_01.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Jochen kriegt gleich zu Beginn einen Brocken vorgesetzt."
          },
          { src: "pics/jugendbezmeist07/bjm07_04.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Nicolas sammelt eifrig Turniererfahrung."
          },
          { src: "pics/jugendbezmeist07/bjm07_05.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Beim vereinsinternen Duell: Rafael und Johannes."
          },
          { src: "pics/jugendbezmeist07/bjm07_06.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Immer schwierig, gegen zwei Damen - Daniel bei der Arbeit."
          },
          { src: "pics/jugendbezmeist07/bjm07_07.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Ein Punkt fehlte Daniel am Ende für den ersten Platz."
          },
          { src: "pics/jugendbezmeist07/bjm07_08.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Aber zweiter ist doch auch ein prächtiges Ergebnis."
          },
          { src: "pics/jugendbezmeist07/bjm07_09.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Jojo hirnt."
          },
          { src: "pics/jugendbezmeist07/bjm07_10.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Jochen freut sich ob seines glücklichen Sieges im letzten Spiel. Co-Betreuer Hermann Knütel freut sich im Hintergrund mit."
          },
          { src: "pics/jugendbezmeist07/bjm07_11.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Ein Türmlein steht alleine ganz still und stumm - Wohin damit? fragt sich Rafi."
          },
          { src: "pics/jugendbezmeist07/bjm07_12.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Vielleicht kann Nicolas einen Rat geben..."
          },
          { src: "pics/jugendbezmeist07/bjm07_13.jpg", 
            title: "Jugend-Bezirksmeisterschaft 07",
            description: "Schwieriges Spiel: Tobias von der Schach AG Bad Säckingen (links) gegen einen der Favoriten, Thomas vom SC Brombach."
          },
        ],
      },
      {
        src: "pics/ludo_07/ludo_07_01.jpg",
        title: "Spielefest Ludothek",
        children: [
          { src: "pics/ludo_07/ludo_07_01.jpg", 
            title: "Spielefest Ludothek",
            description: "Der Schachclub Laufenburg e.V. war auch mit einem Tisch vertreten."
          },
          { src: "pics/ludo_07/ludo_07_02.jpg", 
            title: "Spielefest Ludothek",
            description: "Viele Gäste testeten neue Spiele"
          },
          { src: "pics/ludo_07/ludo_07_03.jpg", 
            title: "Spielefest Ludothek",
            description: "Wo es Platz gab, wurde gezockt"
          },
          { src: "pics/ludo_07/ludo_07_04.jpg", 
            title: "Spielefest Ludothek",
            description: "Es wurde um jeden Punkt hart gekämpft"
          },
        ],
      },
      {
        src: "pics/bernhard_10_07/b_10_07_01.jpg",
        title: "Bürgins feiern 100",
        children: [
          { src: "pics/bernhard_10_07/b_10_07_01.jpg", 
            title: "Bürgins feiern 100",
            description: "Unsere Gastgeber"
          },
          { src: "pics/bernhard_10_07/b_10_07_02.jpg", 
            title: "Bürgins feiern 100",
            description: "Erst gab es ein richtig leckeres Brunch..."
          },
          { src: "pics/bernhard_10_07/b_10_07_03.jpg", 
            title: "Bürgins feiern 100",
            description: "... dann ging's für uns natürlich an die Bretter!"
          },
          { src: "pics/bernhard_10_07/b_10_07_04.jpg", 
            title: "Bürgins feiern 100",
            description: "Harte Kämpfe während..."
          },
          { src: "pics/bernhard_10_07/b_10_07_05.jpg", 
            title: "Bürgins feiern 100",
            description: "einer gemütlichen Fahrt."
          },
          { src: "pics/bernhard_10_07/b_10_07_06.jpg", 
            title: "Bürgins feiern 100",
            description: "Dank an dieser Stelle nochmals an Manuela und Bernhard, sowie Bernhards Vater, der uns die Bilder zur Verfügung gestellt hat."
          },
          { src: "pics/bernhard_10_07/karte_01.jpg", 
            title: "Bürgins feiern 100",
            description: "Und hier noch unser Glückwunschkärtchen"
          },
          { src: "pics/bernhard_10_07/karte_02.jpg", 
            title: "Bürgins feiern 100",
            description: ""
          },
          { src: "pics/bernhard_10_07/karte_03.jpg", 
            title: "Bürgins feiern 100",
            description: ""
          },
        ],
      },
      {
        src: "pics/jgp_07_engen/engen07_01.jpg",
        title: "BSH-JGP Engen 07",
        children: [
          { src: "pics/jgp_07_engen/engen07_01.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Die erste Runde beginnt..."
          },
          { src: "pics/jgp_07_engen/engen07_02.jpg", 
            title: "BSH-JGP Engen 07",
            description: "... gleich mit einem Lokalderby."
          },
          { src: "pics/jgp_07_engen/engen07_03.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Ein Zug, ein Zug, ..."
          },
          { src: "pics/jgp_07_engen/engen07_04.jpg", 
            title: "BSH-JGP Engen 07",
            description: "... ein Königreich für einen guten Zug!"
          },
          { src: "pics/jgp_07_engen/engen07_05.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Schwierige Stellung?"
          },
          { src: "pics/jgp_07_engen/engen07_06.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Rafi meditiert."
          },
          { src: "pics/jgp_07_engen/engen07_07.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Da war doch vorhin noch mein Turm..."
          },
          { src: "pics/jgp_07_engen/engen07_08.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Jakobsche - Sterzik"
          },
          { src: "pics/jgp_07_engen/engen07_09.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Und der Klassiker: Bahner - Haag"
          },
          { src: "pics/jgp_07_engen/engen07_10.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Kinkalitzchen!"
          },
          { src: "pics/jgp_07_engen/engen07_11.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Ein bisschen Spass muss sein!"
          },
          { src: "pics/jgp_07_engen/engen07_12.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Jochen wurde 3. in seiner Gruppe"
          },
          { src: "pics/jgp_07_engen/engen07_14.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Daniel 4."
          },
          { src: "pics/jgp_07_engen/engen07_16.jpg", 
            title: "BSH-JGP Engen 07",
            description: "Finales Gruppenfoto"
          },
        ],
      },
      {
        src: "pics/lakiso_07/lakiso07_01.jpg",
        title: "Lakiso 2007",
        children: [
          { src: "pics/lakiso_07/lakiso07_01.jpg", 
            title: "Lakiso 2007",
            description: "9 schachbegeisterte Kinder und Jugendliche trafen sich im Freibad"
          },
          { src: "pics/lakiso_07/lakiso07_02.jpg", 
            title: "Lakiso 2007",
            description: "Schlagen macht am meisten Spaß!"
          },
          { src: "pics/lakiso_07/lakiso07_03.jpg", 
            title: "Lakiso 2007",
            description: "Am Demonstrationsbrett"
          },
          { src: "pics/lakiso_07/lakiso07_04.jpg", 
            title: "Lakiso 2007",
            description: "Ob es hier wohl noch eine Rettung für Weiss gibt?"
          },
          { src: "pics/lakiso_07/lakiso07_05.jpg", 
            title: "Lakiso 2007",
            description: "Heinz Meyer begutachtet das Spiel"
          },
          { src: "pics/lakiso_07/lakiso07_06.jpg", 
            title: "Lakiso 2007",
            description: "Gruppenfoto auf der Rutsche ..."
          },
          { src: "pics/lakiso_07/lakiso07_07.jpg", 
            title: "Lakiso 2007",
            description: "... und am Freilandschach"
          },
          { src: "pics/lakiso_07/lakiso07_08.jpg", 
            title: "Lakiso 2007",
            description: "Auch Hermann Knütel und Elmar Kohlhöfer waren hilfreich"
          },
        ],
      },
      {
        src: "pics/jhv_07/jhv_07_1.jpg",
        title: "JHV 2007",
        children: [
          { src: "pics/jhv_07/jhv_07_1.jpg", 
            title: "JHV 2007",
            description: "Ehrungen (von links) Elmar Kohlhöfer erhält die Treuenadel des Verbandes für 25-jährige Mitgliedschaft Vereinsmeisterschaft 2007: Bernhard Bürgin (2.), Dr. Thomas Schmidt (Vereinsmeister) und Roland Bahner (3.)"
          },
          { src: "pics/jhv_07/jhv_07_2.jpg", 
            title: "JHV 2007",
            description: "Der neugewählte Vorstand (von links): Hermann Knütel (Schachwart), Roland Bahner (2. Vorstand und Jugendleiter), Heinz Meyer (1. Vorstand und Schriftführer), Wolfgang Scheina (Spielleiter) und Bernhard Bürgin (Kassier)"
          },
          { src: "pics/jhv_07/jhv07_p1.gif", 
            title: "JHV 2007",
            description: "Und so berichtete die Presse Südkurier vom 27.07.07: (auf drei Spalten umgebrochen)"
          },
          { src: "pics/jhv_07/jhv07_p2.jpg", 
            title: "JHV 2007",
            description: "Badische Zeitung vom 26.07.07 (auf vier Spalten umgebrochen)"
          },
          { src: "pics/jhv_07/jhv07_p3.gif", 
            title: "JHV 2007",
            description: "und nochmal der Südkurier vom 2.8.07"
          },
        ],
      },
      {
        src: "pics/jgp_07_brombach/brombach07_00.jpg",
        title: "BSH-JGP Brombach 07",
        children: [
          { src: "pics/jgp_07_brombach/brombach07_00.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "76 Kinder und Jugendliche trafen sich in der Sporthalle in Brombach. Gespielt wurde in den Altersgruppen U8, U10, U12, U14 und U16. Der SC Laufenburg war durch 6 Jugendlichen und einen Gast beim Turnier vertreten."
          },
          { src: "pics/jgp_07_brombach/brombach07_01.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Beim Aufwärmen"
          },
          { src: "pics/jgp_07_brombach/brombach07_02.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Turnierbeginn"
          },
          { src: "pics/jgp_07_brombach/brombach07_03.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Jochen bei der Arbeit..."
          },
          { src: "pics/jgp_07_brombach/brombach07_04.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Auch Rafael kämpft..."
          },
          { src: "pics/jgp_07_brombach/brombach07_05.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Lukas überlegt..."
          },
          { src: "pics/jgp_07_brombach/brombach07_06.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Daniel will den schnellen Sieg..."
          },
          { src: "pics/jgp_07_brombach/brombach07_07.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Daniel (4. Platz U12)"
          },
          { src: "pics/jgp_07_brombach/brombach07_08.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Lukas (15. Platz U12)"
          },
          { src: "pics/jgp_07_brombach/brombach07_10.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Nicolas (7. Platz U14)"
          },
          { src: "pics/jgp_07_brombach/brombach07_12.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Johannes (8. Platz U16)"
          },
          { src: "pics/jgp_07_brombach/brombach07_09.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Rafael (7. Platz U16)"
          },
          { src: "pics/jgp_07_brombach/brombach07_11.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "Jochen (4. Platz U14)"
          },
          { src: "pics/jgp_07_brombach/brombach07_13.jpg", 
            title: "BSH-JGP Brombach 07",
            description: "und unser Gast Tobias von der Schach-AG Bad Säckingen (3. Platz U16)"
          },
        ],
      },
      {
        src: "pics/jgp_07_geisingen/jpg_geisingen07_01.jpg",
        title: "BSH-JGP Geisingen 07",
        children: [
          { src: "pics/jgp_07_geisingen/jpg_geisingen07_01.jpg", 
            title: "BSH-JGP Geisingen 07",
            description: "77 schachbegeisterte Kinder und Jugendliche trafen sich in Geisingen."
          },
          { src: "pics/jgp_07_geisingen/jpg_geisingen07_02.jpg", 
            title: "BSH-JGP Geisingen 07",
            description: "Jochen bei der Arbeit"
          },
          { src: "pics/jgp_07_geisingen/jpg_geisingen07_03.jpg", 
            title: "BSH-JGP Geisingen 07",
            description: "Jochens erster Sieg gegen seinen Angstgegner Gregor bahnt sich an"
          },
          { src: "pics/jgp_07_geisingen/jpg_geisingen07_04.jpg", 
            title: "BSH-JGP Geisingen 07",
            description: "Daniel etwas zu schnell..."
          },
          { src: "pics/jgp_07_geisingen/jpg_geisingen07_05.jpg", 
            title: "BSH-JGP Geisingen 07",
            description: "Lukas etwas vorsichtiger."
          },
          { src: "pics/jgp_07_geisingen/jpg_geisingen07_06.jpg", 
            title: "BSH-JGP Geisingen 07",
            description: "Jochen freut sich über Platz 2 in der U14"
          },
          { src: "pics/jgp_07_geisingen/jpg_geisingen07_07.jpg", 
            title: "BSH-JGP Geisingen 07",
            description: "Unser Gast Tobias Oelschlegel wurde 4. in der U16"
          },
        ],
      },
      {
        src: "pics/niko_06/niko06_01.jpg",
        title: "Nikolausblitz 2006",
        children: [
          { src: "pics/niko_06/niko06_01.jpg", 
            title: "Nikolausblitz 2006",
            description: "Die Spannung steigt: Was ist unter der Alufolie versteckt?"
          },
          { src: "pics/niko_06/niko06_02.jpg", 
            title: "Nikolausblitz 2006",
            description: "Unser 1. Vorstand lüftet das Geheimnis."
          },
          { src: "pics/niko_06/niko06_03.jpg", 
            title: "Nikolausblitz 2006",
            description: "Lecker, lecker..."
          },
          { src: "pics/niko_06/niko06_04.jpg", 
            title: "Nikolausblitz 2006",
            description: "Bernhard mit dem Wanderpokal."
          },
          { src: "pics/niko_06/niko06_05.jpg", 
            title: "Nikolausblitz 2006",
            description: "Die Sieger des Sommerpokalturniers 2006 (von links): Wolfgang (3.), Bernhard (1.), Bahni (2.)"
          },
          { src: "pics/niko_06/niko06_06.jpg", 
            title: "Nikolausblitz 2006",
            description: "Nun wird's ernst: Das Nikolausblitzturnier beginnt."
          },
          { src: "pics/niko_06/niko06_07.jpg", 
            title: "Nikolausblitz 2006",
            description: "Die Sieger (hier mit geliehenen Pokalen) von links: Bernhard (2.), Elmar (1.), Bahni (3.)"
          },
        ],
      },
      {
        src: "pics/jugrandprix06_engen/jugraprix_engen_06_01.jpg",
        title: "BSH-JGP Engen 06",
        children: [
          { src: "pics/jugrandprix06_engen/jugraprix_engen_06_01.jpg", 
            title: "BSH-JGP Engen 06",
            description: "Ein seltener Anblick: Der SC Laufenburg ist die erste Mannschaft, die eintrifft... (ich hatte den Starttermin um eine halbe Stunde nach vorne verlegt)"
          },
          { src: "pics/jugrandprix06_engen/jugraprix_engen_06_02.jpg", 
            title: "BSH-JGP Engen 06",
            description: "Kurz mal warm machen am Brett."
          },
          { src: "pics/jugrandprix06_engen/jugraprix_engen_06_03.jpg", 
            title: "BSH-JGP Engen 06",
            description: "Und schon geht's los. Die U14-Gruppe war stark besetzt."
          },
          { src: "pics/jugrandprix06_engen/jugraprix_engen_06_04.jpg", 
            title: "BSH-JGP Engen 06",
            description: "Auch in der U12 konnte Lukas trotz anfänglicher Erfolge keinen Blumentopf gewinnen."
          },
          { src: "pics/jugrandprix06_engen/jugraprix_engen_06_05.jpg", 
            title: "BSH-JGP Engen 06",
            description: "Rafael haderte ebenfalls mit seinem Schicksal."
          },
          { src: "pics/jugrandprix06_engen/jugraprix_engen_06_06.jpg", 
            title: "BSH-JGP Engen 06",
            description: "Daniel gegen den späteren Turniergesamtsieger der U10."
          },
          { src: "pics/jugrandprix06_engen/jugraprix_engen_06_07.jpg", 
            title: "BSH-JGP Engen 06",
            description: "Turnieratmosphäre."
          },
          { src: "pics/jugrandprix06_engen/jugraprix_engen_06_08.jpg", 
            title: "BSH-JGP Engen 06",
            description: "Schnell noch die Trostpreise verstaut und dann wieder ab nach Hause..."
          },
        ],
      },
      {
        src: "pics/jugendbezmeist06/bezju_01.jpg",
        title: "Jugend-Bezirksmeisterschaft 06",
        children: [
          { src: "pics/jugendbezmeist06/bezju_01.jpg", 
            title: "Jugend-Bezirksmeisterschaft 06",
            description: "Turnieratmosphäre im Hochrhein Gymnasium"
          },
          { src: "pics/jugendbezmeist06/bezju_02.jpg", 
            title: "Jugend-Bezirksmeisterschaft 06",
          },
          { src: "pics/jugendbezmeist06/bezju_03.jpg", 
            title: "Jugend-Bezirksmeisterschaft 06",
            description: "Lukas Sterzik erkämpfte Platz 2 in der U12."
          },
          { src: "pics/jugendbezmeist06/bezju_04.jpg", 
            title: "Jugend-Bezirksmeisterschaft 06",
            description: "Rafael Sterzik hatte es schwer..."
          },
          { src: "pics/jugendbezmeist06/bezju_05.jpg", 
            title: "Jugend-Bezirksmeisterschaft 06",
            description: "Jochen Bahner erreichte trotz dieses Schnitzers (Schwarz gewann) ..."
          },
          { src: "pics/jugendbezmeist06/bezju_06.jpg", 
            title: "Jugend-Bezirksmeisterschaft 06",
            description: "... noch Platz 3 in der U14."
          },
        ],
      },
      {
        src: "pics/jhv_06/jhv06_01.jpg",
        title: "JHV 2006",
        children: [
          { src: "pics/jhv_06/jhv06_01.jpg", 
            title: "JHV 2006",
            description: "Andächtig lauschende Zuhörer bei der Jahreshauptversammlung. Auch zwei Jugendspieler sind dabei. Hinten links Gabriele Schäuble, die Repräsentantin der Stadt Laufenburg."
          },
          { src: "pics/jhv_06/jhv06_02.jpg", 
            title: "JHV 2006",
            description: "Die Berichte des Vorstands werden vorgetragen. Von links: H. Meyer, E. Kohlhöfer und S. Korb"
          },
          { src: "pics/jhv_06/jhv06_03.jpg", 
            title: "JHV 2006",
            description: "Dem Vorstand frontal gegenüber. Leider fehlte Kassier B. Bürgin."
          },
          { src: "pics/jhv_06/jhv06_04.jpg", 
            title: "JHV 2006",
            description: "Siegerehrung für die Vereinsmeisterschaft 06. Elmar und Siegfried gratulieren Roland Bahner zum dritten Platz."
          },
          { src: "pics/jhv_06/jhv06_05.jpg", 
            title: "JHV 2006",
            description: "Wolfgang Scheina wurde zweiter."
          },
          { src: "pics/jhv_06/jhv06_07.jpg", 
            title: "JHV 2006",
            description: "Bernhard Bürgin wurde der Siegerpokal zunächst in Abwesenheit überreicht."
          },
          { src: "pics/jhv_06/jhv06_09.jpg", 
            title: "JHV 2006",
            description: "Hier unser Vorstand Heinz Meyer, der Bernhard zwei Tage später den Pokal überbringt."
          },
          { src: "pics/jhv_06/jhv06_06.jpg", 
            title: "JHV 2006",
            description: "Nochmals Platz 2 und 3 bei der Aufstellung zum Pressefoto."
          },
          { src: "pics/jhv_06/jhv06_08.jpg", 
            title: "JHV 2006",
            description: "Frau Schäuble und die inzwischen zur Abholung ihres Sohns Jochen eingetroffene Frau Matt sind sichtbar amüsiert."
          },
          { src: "pics/jhv_06/jhv06sk.gif", 
            title: "JHV 2006",
            description: "Und so berichtete die Presse Südkurier vom 13.10.06: (auf drei Spalten umgebrochen)"
          },
          { src: "pics/jhv_06/jhv06bz.jpg", 
            title: "JHV 2006",
            description: "Badische Zeitung vom 16.10.06 (auf zwei Spalten umgebrochen)"
          },
        ],
      },
      {
        src: "pics/jugendgrandprix06/teilnehmer_gesamt.jpg",
        title: "BSH-JGP Brombach 06",
        children: [
          { src: "pics/jugendgrandprix06/teilnehmer_gesamt.jpg", 
            title: "BSH-JGP Brombach 06",
            description: "Mit 59 Teilnehmern war das Turnier sehr gut besetzt."
          },
          { src: "pics/jugendgrandprix06/johannes.jpg", 
            title: "BSH-JGP Brombach 06",
            description: "Johannes kämpft um jeden Punkt."
          },
          { src: "pics/jugendgrandprix06/lukas_rafael.jpg", 
            title: "BSH-JGP Brombach 06",
            description: "Lukas (links) und Rafael bei der Arbeit."
          },
          { src: "pics/jugendgrandprix06/tobias_gesamt.jpg", 
            title: "BSH-JGP Brombach 06",
            description: "Tobias (ganz rechts) und Eindrücke aus einem der beiden Turniersäle."
          },
          { src: "pics/jugendgrandprix06/jochen_gregor_haag.jpg", 
            title: "BSH-JGP Brombach 06",
            description: "Jochen (vorne Mitte) gegen seinen Angstgegner Gregor Haag."
          },
          { src: "pics/jugendgrandprix06/daniel.jpg", 
            title: "BSH-JGP Brombach 06",
            description: "Daniel cool und entspannt (was, der ist schon matt?)."
          },
          { src: "pics/jugendgrandprix06/lukas_dritter.jpg", 
            title: "BSH-JGP Brombach 06",
            description: "Lukas ist stolz auf seinen 3. Platz in der U12."
          },
          { src: "pics/jugendgrandprix06/tobias_zweiter.jpg", 
            title: "BSH-JGP Brombach 06",
            description: "Tobias wurde 2. in der U12, obwohl er schon etwas älter war... (aber der Computer hat immer Recht )."
          },
          { src: "pics/jugendgrandprix06/daniel_sieger.jpg", 
            title: "BSH-JGP Brombach 06",
            description: "Strahlender Sieger in der U10 wurde Daniel."
          },
          { src: "pics/jugendgrandprix06/alle_nach_turnier.jpg", 
            title: "BSH-JGP Brombach 06",
            description: "Nach dem Turnier."
          },
        ],
      },
      {
        src: "pics/lakiso_06/lakiso06_01.jpg",
        title: "Lakiso 2006",
        children: [
          { src: "pics/lakiso_06/lakiso06_01.jpg", 
            title: "Lakiso 2006",
            description: "Es begann mit strahlendem Sonnenschein und Badewetter." 
          },
          { src: "pics/lakiso_06/lakiso06_02.jpg", 
            title: "Lakiso 2006",
            description: "Das Dach, anfangs Schattenspender, beschützte uns am dritten Tag vor dem Regen." 
          },
          { src: "pics/lakiso_06/lakiso06_03.jpg", 
            title: "Lakiso 2006",
            description: "Konzentration und Spass." 
          },
          { src: "pics/lakiso_06/lakiso06_04.jpg", 
            title: "Lakiso 2006",
            description: "Auch das leibliche Wohl durfte nicht zu kurz kommen." 
          },
          { src: "pics/lakiso_06/lakiso06_05.jpg", 
            title: "Lakiso 2006",
            description: "Interessiert wird dem Spiel der alten Hasen zugeschaut." 
          },
          { src: "pics/lakiso_06/lakiso06_07.jpg", 
            title: "Lakiso 2006",
            description: "Auch das Freilandschach im Schwimmbad kam zum Einsatz." 
          },
          { src: "pics/lakiso_06/lakiso06_08.jpg", 
            title: "Lakiso 2006",
          },
          { src: "pics/lakiso_06/sk110806.jpg", 
            title: "Lakiso 2006",
            description: "Und das meinte die Presse Südkurier vom 11.08.2006" 
          },
        ],
      },
      {
        src: "pics/scj_1205/scj_01.jpg",
        title: "Jugendtraining Dez. 05",
        children: [
          { src: "pics/scj_1205/scj_01.jpg", 
            title: "Jugendtraining Dez. 05",
            description: "Insgesamt sieben Jugendliche hatten sich zum Wiederaufleben des Jugendtrainings eingefunden." 
          },
          { src: "pics/scj_1205/scj_02.jpg", 
            title: "Jugendtraining Dez. 05",
          },
        ],
      },
      {
        src: "pics/niko_05/niko05_01.jpg",
        title: "Nikolausblitz 2005",
        children: [
          { src: "pics/niko_05/niko05_01.jpg", 
            title: "Nikolausblitz 2005",
            description: "Die Mannschaft versammelt sich am kleinen Imbiss."
          },
          { src: "pics/niko_05/niko05_02.jpg", 
            title: "Nikolausblitz 2005",
            description: "Ehrung für das Sommerpokalturnier 2005"
          },
          { src: "pics/niko_05/niko05_sieger.jpg", 
            title: "Nikolausblitz 2005",
            description: " Platz 3: Bernhard Bürgin	     Sieger: Roland Bahner	    Platz 2: Wolfgang Scheina"
          },
          { src: "pics/niko_05/niko05_03.jpg", 
            title: "Nikolausblitz 2005",
            description: "Brot und Spiele"
          },
          { src: "pics/niko_05/niko05_04.jpg", 
            title: "Nikolausblitz 2005",
            description: "Zwischendurch immer wieder ein kleines Häppchen..."
          },
          { src: "pics/niko_05/niko05_05.jpg", 
            title: "Nikolausblitz 2005",
            description: "... dann klappt's auch mit der Konzentration."
          },
          { src: "pics/niko_05/siegerehrung.jpg", 
            title: "Nikolausblitz 2005",
            description: "Die Sieger waren dieselben wie beim Sommerpokal"
          },
          { src: "pics/niko_05/nikoblitz_05.gif", 
            title: "Nikolausblitz 2005",
          },
          { src: "pics/niko_05/niko05_bz.jpg", 
            title: "Nikolausblitz 2005",
            description: "Und das meinte die Presse Badische Zeitung vom 8.12.05"
          },
          { src: "pics/niko_05/niko05_sk.jpg", 
            title: "Nikolausblitz 2005",
            description: "Südkurier vom 9.12.05 (Artikel auf 3 Spalten umgestaltet)"
          },
        ],
      },
      {
        src: "pics/wietal05/wietal_01.jpg",
        title: "Wiesental-Jugendturnier 2005",
        children: [
          { src: "pics/wietal05/wietal_01.jpg", 
            title: "Wiesental-Jugendturnier 2005",
            description: "Begrüßung durch H.P. Rothmund und M. Haag"
          },
          { src: "pics/wietal05/wietal_02.jpg", 
            title: "Wiesental-Jugendturnier 2005",
            description: "Die Gruppe 1993 und jünger mit den beiden Bahner-Buben (links)"
          },
          { src: "pics/wietal05/wietal_03.jpg", 
            title: "Wiesental-Jugendturnier 2005",
            description: "Tobias spielt gegen den späteren Sieger Thomas Jakobsche"
          },
          { src: "pics/wietal05/wietal_04.jpg", 
            title: "Wiesental-Jugendturnier 2005",
            description: "Heiße Kämpfe an Brett 1 und Brett 2"
          },
          { src: "pics/wietal05/wietal_05.jpg", 
            title: "Wiesental-Jugendturnier 2005",
            description: "Daniel Bahner erreicht Platz 6 von 11 in der Gruppe 1993 und jünger"
          },
          { src: "pics/wietal05/wietal_06.jpg", 
            title: "Wiesental-Jugendturnier 2005",
            description: "Rafael Sterzik erreicht Platz 9 in der Gruppe 1992 und älter"
          },
          { src: "pics/wietal05/wietal_07.jpg", 
            title: "Wiesental-Jugendturnier 2005",
            description: "Tobias Oelschlegel auf Platz 6 in der Gruppe 1992 und älter"
          },
          { src: "pics/wietal05/wietal_08.jpg", 
            title: "Wiesental-Jugendturnier 2005",
            description: "Jochen Bahner (2. v.l.) erhält als zweiter in der Gruppe 1993 und jünger einen Pokal"
          },
          { src: "pics/wietal05/wietal_09.jpg", 
            title: "Wiesental-Jugendturnier 2005",
            description: "Die strahlenden Sieger"
          },
        ],
      },
      {
        src: "pics/jhv_05/jhv05_01.jpg",
        title: "JHV 2005",
        children: [
          { src: "pics/jhv_05/jhv05_01.jpg", 
            title: "JHV 2005",
            description: "Andächtig lauschende Zuhörer bei der Jahreshauptversammlung rechts im Bild: Bürgermeister Roland Waßmer"
          },
          { src: "pics/jhv_05/jhv05_02.jpg", 
            title: "JHV 2005",
            description: "Siegerehrung Vereinsmeisterschaft: Elmar Kohlhöfer gratuliert Roland Bahner zum 3. Platz"
          },
          { src: "pics/jhv_05/jhv05_03.jpg", 
            title: "JHV 2005",
            description: "Josef Jurgetz wurde zweiter."
          },
          { src: "pics/jhv_05/jhv05_04.jpg", 
            title: "JHV 2005",
            description: "Applaus für den neuen Vereinsmeister Wolfgang Scheina"
          },
          { src: "pics/jhv_05/jhv05_05.jpg", 
            title: "JHV 2005",
            description: "Unser Vereinsmeister 2005"
          },
          { src: "pics/jhv_05/jhv05_06.jpg", 
            title: "JHV 2005",
            description: "Gruppenbild der drei Sieger"
          },
          { src: "pics/jhv_05/jhv05_07.jpg", 
            title: "JHV 2005",
            description: "Der neu gewählte alte Vorstand: Elmar Kohlhöfer, Bernhard Bürgin, Heinz Meyer, Roland Bahner (nicht im Bild: Siegfried Korb)"
          },
          { src: "pics/jhv_05/jhv05_08.jpg", 
            title: "JHV 2005",
            description: "Im Anschluss an den offiziellen Teil wurde natürlich wieder heftigst gefidelt..."
          },
          { src: "pics/jhv_05/jhv05_09.jpg", 
            title: "JHV 2005",
          },
          { src: "pics/jhv_05/jhv05_suedk.gif", 
            title: "JHV 2005",
            description: "Und hier der Presseartikel aus dem Südkurier vom 7.7.05"
          },
        ],
      },
      {
        src: "pics/bezvers_05/bzv05_01.jpg",
        title: "Bezirksversammlung 2005",
        children: [
          { src: "pics/bezvers_05/bzv05_01.jpg", 
            title: "Bezirksversammlung 2005",
            description: "Der Bezirksvorstand von links: Martin Huber, Martin Rothmund, Hans-Peter Rothmund und Markus Haag"
          },
          { src: "pics/bezvers_05/bzv05_02.jpg", 
            title: "Bezirksversammlung 2005",
            description: "Anregende Diskussionen standen auf der Tagesordnung"
          },
          { src: "pics/bezvers_05/bzv05_03.jpg", 
            title: "Bezirksversammlung 2005",
            description: "Der Präsident des Badischen Schachverbands, Fritz Meyer, war ebenfalls anwesend und freute sich, dass der Fotograf gerade ein Bier bekam..."
          },
          { src: "pics/bezvers_05/bzv05_04.jpg", 
            title: "Bezirksversammlung 2005",
            description: "Schulschach war das vorherrschende Thema"
          },
          { src: "pics/bezvers_05/bzv05_05.jpg", 
            title: "Bezirksversammlung 2005",
            description: "Fritz Meyer wird verabschiedet"
          },
        ],
      },
      {
        src: "pics/niko_04/n04_3.jpg",
        title: "Nikolausblitz 2004",
        children: [
          { src: "pics/niko_04/n04_3.jpg", 
            title: "Nikolausblitz 2004", 
            description: "Die Mannschaft versammelt sich."
          },
          { src: "pics/niko_04/n04_1.jpg", 
            title: "Nikolausblitz 2004", 
            description: "Und wieder einmal war..."
          },
          { src: "pics/niko_04/n04_2.jpg", 
            title: "Nikolausblitz 2004", 
            description: "... ein kleiner Imbiss vorbestellt."
          },
          { src: "pics/niko_04/niko04_5.jpg", 
            title: "Nikolausblitz 2004", 
            description: "Platz 3: Wolfgang Scheina"
          },
          { src: "pics/niko_04/niko04_7.jpg", 
            title: "Nikolausblitz 2004", 
            description: "Platz 2: Josef Jurgetz"
          },
          { src: "pics/niko_04/niko04_6.jpg", 
            title: "Nikolausblitz 2004", 
            description: "Der Sieger: Bernhard Bürgin"
          },
          { src: "pics/niko_04/niko04_0.jpg", 
            title: "Nikolausblitz 2004", 
            description: "Ein Bild für die Presse (leider war Josef noch nicht anwesend)"
          },
          { src: "pics/niko_04/niko04_4.jpg", 
            title: "Nikolausblitz 2004", 
            description: "Das Blitzturnier beginnt"
          },
          { src: "pics/niko_04/niko04_8.jpg", 
            title: "Nikolausblitz 2004", 
            description: "Die späteren Spitzenreiter bei der Sache"
          },
          { src: "pics/niko_04/niko04_10.jpg", 
            title: "Nikolausblitz 2004", 
            description: "Leider hatte meine Kamera an diesem Abend leichte Schärfeprobleme. Weswegen auch nicht mehr Bilder zu sehen sind..."
          },
          { src: "pics/niko_04/badzeit_04.gif", 
            title: "Nikolausblitz 2004", 
            description: "Der Bericht in der Badischen Zeitung vom 9.12.04"
          },
          { src: "pics/niko_04/sopok04_presse_1.jpg", 
            title: "Nikolausblitz 2004", 
            description: "Und das meinte der Südkurier am 10.12.04"
          },
        ],
      },
      {
        src: "pics/slowup_04.jpg",
        title: "Slow Up 06.08.04",
        children: [
          { src: "pics/slowup_04.jpg", 
            title: "Slow Up 06.08.04" 
          },
          { src: "pics/slowup_04_1.jpg", 
            title: "Slow Up 06.08.04" 
          },
        ],
      },
      {
        src: "pics/jhv_04/jhv_04_01.jpg",
        title: "JHV 2004",
        children: [
          { src: "pics/jhv_04/jhv_04_01.jpg", 
            title: "JHV 2004", 
            description: "Der Vorstand 2004: Bürgin, Bahner, Kohlhöfer, Meyer (nicht im Bild: Korb)"
          },
          { src: "pics/jhv_04/jhv_04_01b.jpg", 
            title: "JHV 2004", 
            description: "Gute Laune war angesagt"
          },
          { src: "pics/jhv_04/jhv_04_02.jpg", 
            title: "JHV 2004", 
            description: "Die strahlenden Sieger der Vereinsmeisterschaft: Scheina (2.), Jurgetz (Vereinsmeister) und Kohlhöfer (3.)"
          },
          { src: "pics/jhv_04/jhv_04_02b.jpg", 
            title: "JHV 2004", 
            description: "Hier noch strahlender..."
          },
          { src: "pics/jhv_04/suedkurier.gif", 
            title: "JHV 2004", 
            description: "Und die Presse berichtete (ich schenk denen bei Gelegenheit mal ein 'n')"
          },
        ],
      },
      {
        src: "pics/todtnau_020504/t2.jpg",
        title: "Letzter Spieltag Todtnau 02.05.04",
        children: [
          { src: "pics/todtnau_020504/t2.jpg", 
            title: "Letzter Spieltag Todtnau 02.05.04",
            description: "Noch sind wir am Kämpfen. Es geht um den Aufstieg..."
          },
          { src: "pics/todtnau_020504/t1.jpg", 
            title: "Letzter Spieltag Todtnau 02.05.04",
            description: "Jeder gibt sein Bestes, aber es reicht halt diesmal nicht."
          },
          { src: "pics/todtnau_020504/t3.jpg", 
            title: "Letzter Spieltag Todtnau 02.05.04",
            description: "Josef erklärt Wolfgang den entscheidenden Zug."
          },
          { src: "pics/todtnau_020504/t4.jpg", 
            title: "Letzter Spieltag Todtnau 02.05.04",
            description: "Die gute Laune lassen wir uns trotzdem nicht nehmen."
          },
        ],
      },
      {
        src: "pics/schopfheim040404/schopfheim040404_1.jpg",
        title: "Gegen Schopfheim 04.04.04",
        children: [
          { src: "pics/schopfheim040404/schopfheim040404_1.jpg", 
            title: "Gegen Schopfheim 04.04.04",
            description: "Edel sehen sie aus, unsere neuen Bretter, Figuren und Uhren..."
          },
          { src: "pics/schopfheim040404/schopfheim040404_2.jpg", 
            title: "Gegen Schopfheim 04.04.04",
            description: "Aber spielen muss man weiterhin mit Kopf und Hand."
          },
          { src: "pics/schopfheim040404/schopfheim040404_3.jpg", 
            title: "Gegen Schopfheim 04.04.04",
            description: "Holger macht ein Remis und trägt zum 5:3 Endstand für uns bei."
          },
          { src: "pics/schopfheim040404/schopfheim040404_4.jpg", 
            title: "Gegen Schopfheim 04.04.04",
            description: "Elmar und Siegfried fideln am Rande des Geschehens."
          },
        ],
      },
      {
        src: "pics/niko_03/01_sopok.jpg",
        title: "Nikolausblitz 2003",
        children: [
          { src: "pics/niko_03/01_sopok.jpg", 
            title: "Nikolausblitz 2003",
            description: "Ehrung für das Sommerpokalturnier 2003 Zum ersten Mal wird der Wanderpokal des Wirtpaares vergeben von links: Vroni, Peter, Josef Jurgetz (3.), Roland Bahner (1.), Bernhard Bürgin (2.) und Heinz Meyer (1. Vorstand)"
          },
          { src: "pics/niko_03/02_buffet_1.jpg", 
            title: "Nikolausblitz 2003",
            description: "Ein kleiner Imbiss war vorbestellt..."
          },
          { src: "pics/niko_03/03_buffet_2.jpg", 
            title: "Nikolausblitz 2003",
            description: "... und mundete hervorragend."
          },
          { src: "pics/niko_03/04_buffet_3.jpg", 
            title: "Nikolausblitz 2003",
            description: "Welchen Witz Elmar da wohl wieder erzählt hat?"
          },
          { src: "pics/niko_03/05_nik_01.jpg", 
            title: "Nikolausblitz 2003",
            description: "Vorbereitungen zum Blitzturnier"
          },
          { src: "pics/niko_03/06_nik_02.jpg", 
            title: "Nikolausblitz 2003",
            description: "Und los geht's"
          },
          { src: "pics/niko_03/07_nik_03.jpg", 
            title: "Nikolausblitz 2003",
            description: "Meyer gegen Korb"
          },
          { src: "pics/niko_03/08_nik_04.jpg", 
            title: "Nikolausblitz 2003",
            description: "Konzentriert bei der Sache."
          },
          { src: "pics/niko_03/09_nik_05.jpg", 
            title: "Nikolausblitz 2003",
            description: "Die Sieger des Blitzturniers: von links: Karl-Heint Pflaum (1.), Heinz Meyer (2.) und Waldemar Schlothauer (3.)"
          },
          { src: "pics/niko_03/10_nik_06.jpg", 
            title: "Nikolausblitz 2003",
            description: "Abschlussgruppenbild leider ohne Dame"
          },
          { src: "pics/niko_03/nikoblitz_03.gif", 
            title: "Nikolausblitz 2003",
            description: "Und hier noch die Endtabelle"
          },
        ],
      },
      {
        src: "pics/211003/linde1.jpg",
        title: "In der Linde 21.10.03",
        children: [
          { src: "pics/211003/linde1.jpg", 
            title: "In der Linde 21.10.03",
            description: "Konzentration beim Sommerpokal (hinten) und beim freien Spiel (vorne)"
          },
          { src: "pics/211003/linde2.jpg", 
            title: "In der Linde 21.10.03",
            description: "Auch Peter, der Lindewirt, freut sich, dass wir bei ihm Schachspielen"
          },
          { src: "pics/211003/linde3.jpg", 
            title: "In der Linde 21.10.03",
            description: "Und da sage noch einer, Schachspielen sei ein ganz ernster Sport..."
          },
          { src: "pics/211003/linde4.jpg", 
            title: "In der Linde 21.10.03",
            description: "Auch in der Linde ein Klassiker: Korb gegen Kohlhöfer"
          },
        ],
      },
      {
        src: "pics/sopok_020903.jpg",
        title: "Sommerpokal 02.09.03",
        children: [
          { src: "pics/sopok_020903.jpg", 
            title: "Sommerpokal 02.09.03",
            description: "Erbitterter Kampf um den Sommerpokal: Jurgetz - Kohlhöfer 1:1 Das Bild entstand nach den ernsthaften Partien beim Fideln."
          }
        ],
      },
      {
        src: "pics/120803/120803_01.jpg",
        title: "Spielabend 12.08.03",
        children: [
          { src: "pics/120803/120803_01.jpg", 
            title: "Spielabend 12.08.03",
            description: "Reger Betrieb in der Klause. Ein Laufenburger Feriengast ist dabei."
          },
          { src: "pics/120803/120803_02.jpg", 
            title: "Spielabend 12.08.03",
            description: "Die Pokalspiele erfordern äusserste Konzentration."
          },
          { src: "pics/120803/120803_03.jpg", 
            title: "Spielabend 12.08.03",
            description: "Im Freien macht es einfach mehr Spass."
          },
          { src: "pics/120803/120803_04.jpg", 
            title: "Spielabend 12.08.03",
            description: "Heinz staunt."
          },
          { src: "pics/120803/120803_05.jpg", 
            title: "Spielabend 12.08.03",
            description: "Wolfgang denkt."
          },
          { src: "pics/120803/120803_06.jpg", 
            title: "Spielabend 12.08.03",
            description: "Spiele und..."
          },
          { src: "pics/120803/120803_07.jpg", 
            title: "Spielabend 12.08.03",
            description: "... Analyse."
          },
          { src: "pics/120803/120803_08.jpg", 
            title: "Spielabend 12.08.03",
            description: "Seh ich recht?"
          },
          { src: "pics/120803/120803_11.jpg", 
            title: "Spielabend 12.08.03",
            description: "Was aus dieser harmlosen Stellung..."
          },
          { src: "pics/120803/120803_10.jpg", 
            title: "Spielabend 12.08.03",
            description: "doch alles werden kann..."
          },
          { src: "pics/120803/120803_12.jpg", 
            title: "Spielabend 12.08.03",
            description: "Schluss jetzt. Feierabend."
          },
        ],
      },
      {
        src: "pics/jhv_03/jhv_03_1.jpg",
        title: "Ehrungen JHV 2003",
        children: [
          { src: "pics/jhv_03/jhv_03_1.jpg", 
            title: "Ehrungen JHV 2003",
            description: "Die strahlenden Sieger bei der Vereinsmeisterschaft und beim Sommerpokal: Scheina, Bürgin, Bahner und Kohlhöfer"
          },
          { src: "pics/jhv_03/jhv_03_2.jpg", 
            title: "Ehrungen JHV 2003",
            description: "Ganz schöne Pötte gab es dieses Jahr."
          },
          { src: "pics/jhv_03/jhv_03_3.jpg", 
            title: "Ehrungen JHV 2003",
          },
        ],
      },
      {
        src: "pics/010703/030701_lokal_2.jpg",
        title: "Spielabend 01.07.03",
        children: [
          { src: "pics/010703/030701_lokal_2.jpg", 
            title: "Spielabend 01.07.03",
            description: "An diesem Abend war unser Nebenzimmer belegt"
          },
          { src: "pics/010703/030701_lokal_3.jpg", 
            title: "Spielabend 01.07.03",
            description: "Siegfried Korb schreitet zur Siegerehrung für das 7-Minuten Blitzturnier vom 28.06."
          },
          { src: "pics/010703/030701_holger.jpg", 
            title: "Spielabend 01.07.03",
            description: "Holger Kutzsche erhielt den Preis für den besten Nicht-Vereins-Mitspieler"
          },
          { src: "pics/010703/030701_scheina.jpg", 
            title: "Spielabend 01.07.03",
            description: "Wolfgang Scheina wurde Dritter"
          },
          { src: "pics/010703/030701_bahner_selbst.jpg", 
            title: "Spielabend 01.07.03",
            description: "Mein Selbstporträt als Zweiter war denn doch etwas überbelichtet"
          },
          { src: "pics/010703/030701_buergin.jpg", 
            title: "Spielabend 01.07.03",
            description: "Bernhard Bürgin als strahlender Erster"
          },
          { src: "pics/010703/030701_lokal_2.jpg", 
            title: "Spielabend 01.07.03",
            description: "Im Anschluss an die Ehrungen wurde, wie üblich, fröhlich weitergefiedelt"
          },
          { src: "pics/010703/030701_lokal.jpg", 
            title: "Spielabend 01.07.03",
            description: "Für frischen Wind sorgten unsere beiden Gäste"
          },
          { src: "pics/010703/030701_vroni.jpg", 
            title: "Spielabend 01.07.03",
            description: "Die freche Wirtin Vroni, kurz nachdem sie mich in den Allerwertesten gekniffen hatte"
          },
          { src: "pics/010703/030701_peter_wolfgang.jpg", 
            title: "Spielabend 01.07.03",
            description: "Peter kassiert Wolfgang ab"
          },
        ],
      },
      {
        src: "pics/280603/280603_01.jpg",
        title: "Frühschoppen und Blitz Juni 03",
        children: [
          { src: "pics/280603/280603_01.jpg", 
            title: "Frühschoppen und Blitz Juni 03",
            description: "Vorsitzender Heinz Meyer bestaunt unsere Homepage" 
          },
          { src: "pics/280603/280603_02.jpg", 
            title: "Frühschoppen und Blitz Juni 03",
            description: "Erst mal einen Kaffee: Heinz Meyer, Siegfried Korb und Christian Jordan" 
          },
          { src: "pics/280603/280603_04.jpg", 
            title: "Frühschoppen und Blitz Juni 03",
            description: "Auch Gäste waren da..." 
          },
          { src: "pics/280603/280603_05.jpg", 
            title: "Frühschoppen und Blitz Juni 03",
            description: "Warmspielen vor dem Blitzturnier" 
          },
          { src: "pics/280603/280603_06.jpg", 
            title: "Frühschoppen und Blitz Juni 03",
            description: "Gleich findet er eine Lösung: Wolfgang Scheina" 
          },
          { src: "pics/280603/280603_07.jpg", 
            title: "Frühschoppen und Blitz Juni 03",
            description: "Siegfried Korb" 
          },
          { src: "pics/280603/280603_08.jpg", 
            title: "Frühschoppen und Blitz Juni 03",
            description: "Klara Lörracher" 
          },
          { src: "pics/280603/280603_10.jpg", 
            title: "Frühschoppen und Blitz Juni 03",
            description: "Unser Gast beim Blitzturnier: Holger Kutzsche" 
          },
        ],
      },
      {
        src: "pics/freibad_juni03/plakat_freibad_03.jpg",
        title: "Schach im Freibad Juni 03",
        children: [
          { src: "pics/freibad_juni03/plakat_freibad_03.jpg", 
            title: "Schach im Freibad Juni 03",
            description: "Das Einladungsplakat" 
          },
          { src: "pics/freibad_juni03/freibad_1.jpg", 
            title: "Schach im Freibad Juni 03",
            description: "Waldemar mit Enkel, Kohlhöfer mit Problemen?" 
          },
          { src: "pics/freibad_juni03/freibad_2.jpg", 
            title: "Schach im Freibad Juni 03",
            description: "Der Klassiker Korb gegen Kohlhöfer: Vorwärts, Kameraden, wir müssen zurück!" 
          },
          { src: "pics/freibad_juni03/freibad_3.jpg", 
            title: "Schach im Freibad Juni 03",
            description: "Geblendet von der Spielstärke des Gegners" 
          },
        ],
      },
      {
        src: "pics/mai_03/030520_0.jpg",
        title: "Spielabende Mai 03",
        children: [
          { src: "pics/mai_03/030520_0.jpg", 
            title: "Spielabende Mai 03",
            description: "Ordnung halten im Schachschrank."
          },
          { src: "pics/mai_03/buck_korb.jpg", 
            title: "Spielabende Mai 03",
            description: "Dieser wurde damals noch von Stefan Buck und Siegfried Korb aufgebaut"
          },
          { src: "pics/mai_03/030520_1.jpg", 
            title: "Spielabende Mai 03",
            description: "Wer spielt mit wem?"
          },
          { src: "pics/mai_03/030520_2.jpg", 
            title: "Spielabende Mai 03",
            description: "Schwierige Stellung"
          },
          { src: "pics/mai_03/030520_3.jpg", 
            title: "Spielabende Mai 03",
            description: "Dein bester Zug war e4!"
          },
          { src: "pics/mai_03/030520_4.jpg", 
            title: "Spielabende Mai 03",
            description: "Und das so kurz vor Schluss..."
          },
          { src: "pics/mai_03/030520_5.jpg", 
            title: "Spielabende Mai 03",
            description: "Das letzte Spiel der Vereinsmeisterschaft 03"
          },
          { src: "pics/mai_03/030527_elmar_siegfried.jpg", 
            title: "Spielabende Mai 03",
            description: "Und wieder mal Kohlhöfer gegen Korb"
          },
          { src: "pics/mai_03/030527_heinz_gast.jpg", 
            title: "Spielabende Mai 03",
            description: "Heinz muss nachdenken"
          },
          { src: "pics/mai_03/030527_elmar_siegfried_2.jpg", 
            title: "Spielabende Mai 03",
            description: "Beide strahlen. dann war's wohl ein Remis..."
          },
        ],
      },
      {
        src: "pics/jugendschach_02_03.jpg",
        title: "Beim Jugendschach",
        children: [
          { src: "pics/jugendschach_02_03.jpg", 
            title: "Beim Jugendschach",
            description: "Beim Schachtraining für Jugendliche wird genau aufgepasst, analysiert und erklärt..."
          }
        ],
      },
      {
        src: "pics/bezpokal_02_03.jpg",
        title: "Bezirkspokal 02/03",
        children: [
          { src: "pics/bezpokal_02_03.jpg", 
            title: "Bezirkspokal 02/03",
            description: "In der ersten Runde gegen Waldshut-Tiengen ausgeschieden."
          }
        ],
      },
      {
        src: "pics/jhv_02/jhv02_merle.jpg",
        title: "Ehrungen JHV 2002",
        children: [
          { src: "pics/jhv_02/jhv02_merle.jpg", 
            title: "Ehrungen JHV 2002",
            description: "Bürgermeister Merle zu Besuch"
          },
          { src: "pics/jhv_02/jhv_02_1.jpg", 
            title: "Ehrungen JHV 2002",
            description: "Pokale für die Vereinsmeisterschaft erhielten (von links): Siegfried Korb (Sieger Gr. 2), Bernhard Bürgin (2. Platz), Vereinsmeister Wolfgang Scheina, Roland Bahner (3. Platz)"
          },
          { src: "pics/jhv_02/jhv_02_2.jpg", 
            title: "Ehrungen JHV 2002"
          },
        ],
      },
      {
        src: "pics/presse/tofftuer2002_1.jpg",
        title: "Tag der offenen Tür 2002",
        children: [
          { src: "pics/presse/tofftuer2002_1.jpg", 
            title: "Tag der offenen Tür 2002",
            description: "Im Bild: Die jungen Schachspieler Florian (links) und Markus, kritisch beäugt von Siegfried Korb, Elmar Kohlhöfer und Heinz Meyer"
          },
          { src: "pics/presse/tofftuer2002_2.jpg", 
            title: "Tag der offenen Tür 2002",
            description: "Am Freilandschach: Siegfried Korb, Elmar Kohlhöfer, Florian und Markus"
          },
        ],
      },
      {
        src: "pics/pokal2002/pok2002_0b.jpg",
        title: "Pokal 2002 mehr Bilder",
        children: [
          { src: "pics/pokal2002/pok2002_0b.jpg", 
            title: "Pokal 2002 mehr Bilder",
            description: "Noch sind sie frohgemut (von links): Waldemar Schlotthauer, Wolfgang Scheina, Bernhard Bürgin, Roland Bahner" 
          },
          { src: "pics/pokal2002/pok2002_5.jpg", 
            title: "Pokal 2002 mehr Bilder",
            description: "Schlotthauer (links) gegen Kaiser: 0 - 1" 
          },
          { src: "pics/pokal2002/pok2002_3.jpg", 
            title: "Pokal 2002 mehr Bilder",
            description: "Schetty (links) gegen Scheina: 1 - 0" 
          },
          { src: "pics/pokal2002/pok2002_1.jpg", 
            title: "Pokal 2002 mehr Bilder",
            description: "Bürßner (links) gegen Bahner: 1 - 0" 
          },
          { src: "pics/pokal2002/pok2002_2.jpg", 
            title: "Pokal 2002 mehr Bilder",
            description: "Krüger (links) gegen Bürgin : 0 - 1!" 
          },
          { src: "pics/pokal2002/pok2002_4.jpg", 
            title: "Pokal 2002 mehr Bilder",
            description: "Gespannte Atmosphäre in unserem Spiellokal" 
          },
        ],
      },
      {
        src: "pics/pokal_2002.jpg",
        title: "Badischer Mannschaftspokal 02",
        children: [
          { src: "pics/pokal_2002.jpg", 
            title: "Badischer Mannschaftspokal 02",
            description: "Für Laufenburg kämpften (von links): Waldemar Schlotthauer, Wolfgang Scheina, Bernhard Bürgin und Roland Bahner"
          }
        ],
      },
      {
        src: "pics/pokalehrung1999.jpg",
        title: "Pokalehrung 1999",
        children: [
          { src: "pics/pokalehrung1999.jpg", 
            title: "Pokalehrung 1999",
            description: "Gewinner beim Sommerpokal 1999 (von links): Roland Bahner, Bernhard Bürgin, Lily Spielmann, Wolfgang Scheina, Josef Ebner, Siegfried Korb"
          }
        ],
      },
      {
        src: "pics/ehrungen98.jpg",
        title: "Ehrungen 1998",
        children: [
          { src: "pics/ehrungen98.jpg", 
            title: "Ehrungen 1998",
            description: "Ehrungen für langjährige Mitglieder des Badischen Schachverbandes (von links): Klara Lörracher, Christian Jordan, Josef Hauser, Franz Baumgartner, Klaus-Dieter Oeschger"
          }
        ],
      },
      {
        src: "pics/schnupper94.jpg",
        title: "Schnupperschach 1994",
        children: [
          { src: "pics/schnupper94.jpg", 
            title: "Schnupperschach 1994",
          }
        ],
      },
      {
        src: "pics/outdoor_94/outdoor94_1.jpg",
        title: "Im Freien 1994",
        children: [
          { src: "pics/outdoor_94/outdoor94_1.jpg", 
            title: "Im Freien 1994" 
          },
          { src: "pics/outdoor_94/outdoor94_2.jpg", 
            title: "Im Freien 1994" 
          },
          { src: "pics/outdoor_94/outdoor94_3.jpg", 
            title: "Im Freien 1994" 
          },
        ],
      },
      {
        src: "pics/abschluss_94/abschluss94_1.jpg",
        title: "25-Jahr-Feier 1994",
        children: [
          { src: "pics/abschluss_94/abschluss94_1.jpg", 
            title: "25-Jahr-Feier 1994", 
            description: "Abschlussfest der 25-Jahr-Feier"
          },
          { src: "pics/abschluss_94/abschluss94_2.jpg", 
            title: "25-Jahr-Feier 1994", 
          },
          { src: "pics/abschluss_94/abschluss94_3.jpg", 
            title: "25-Jahr-Feier 1994", 
          },
          { src: "pics/abschluss_94/abschluss94_4.jpg", 
            title: "25-Jahr-Feier 1994", 
          },
          { src: "pics/abschluss_94/abschluss94_5.jpg", 
            title: "25-Jahr-Feier 1994", 
          },
          { src: "pics/abschluss_94/abschluss94_6.jpg", 
            title: "25-Jahr-Feier 1994", 
          },
          { src: "pics/abschluss_94/abschluss94_7.jpg", 
            title: "25-Jahr-Feier 1994", 
          },
          { src: "pics/abschluss_94/abschluss94_8.jpg", 
            title: "25-Jahr-Feier 1994", 
          },
          { src: "pics/abschluss_94/abschluss94_9.jpg", 
            title: "25-Jahr-Feier 1994", 
          },
        ],
      },
      {
        src: "pics/partosch_94/partosch94.jpg",
        title: "Partosch 1994",
        children: [
          { src: "pics/partosch_94/partosch94.jpg", 
            title: "Partosch 1994", 
            description: "Großmeister Charles Partosch. In einer vom Schachclub Laufenburg veranstalteten Simultanveranstaltung im Schlößle in Laufenburg trat Charles Partosch gegen 21 Gegner an. Seine Bilanz: 19 Siege und 2 Remis. Im Folgenden noch einige Schwarzweissimpressionen von der Simultanveranstaltung."
          },
          { src: "pics/partosch_94/partosch94_1.jpg", 
            title: "Partosch 1994", 
            description: "Heinz Meyer ist sichtlich beeindruckt."
          },
          { src: "pics/partosch_94/partosch94_2.jpg", 
            title: "Partosch 1994" 
          },
          { src: "pics/partosch_94/partosch94_3.jpg", 
            title: "Partosch 1994", 
            description: "Siegfried Korb gibt sein Bestes."
          },
          { src: "pics/partosch_94/partosch94_4.jpg", 
            title: "Partosch 1994" 
          },
        ],
      },
      {
        src: "pics/klause_94/klause1.jpg",
        title: "Gärtnerklause 94",
        children: [
          { src: "pics/klause_94/klause1.jpg", 
            title: "Gärtnerklause 94",
            description: "Jugendschach in der Gärtnerklause"
          },
          { src: "pics/klause_94/klause2.jpg", 
            title: "Gärtnerklause 94",
            description: "rechts im Bild: Heinz Meyer und Herbert Müller"
          },
          { src: "pics/klause_94/klause3.jpg", 
            title: "Gärtnerklause 94",
            description: "Jung und alt gemeinsam bei der Sache"
          },
          { src: "pics/klause_94/klause4.jpg", 
            title: "Gärtnerklause 94",
            description: "Lörracher gegen Hauser"
          },
          { src: "pics/klause_94/klause5.jpg", 
            title: "Gärtnerklause 94",
            description: "Baumgartner gegen Müller"
          },
          { src: "pics/klause_94/klause6.jpg", 
            title: "Gärtnerklause 94",
            description: "Der Klassiker: Kohlhöfer gegen Korb. Ob er den Turm wohl nimmt?"
          },
          { src: "pics/klause_94/klause7.jpg", 
            title: "Gärtnerklause 94",
            description: "Der König muss zurück..."
          },
          { src: "pics/klause_94/klause8.jpg", 
            title: "Gärtnerklause 94",
            description: "Des gibts doch ned..."
          },
        ],
      },
      {
        src: "pics/verein94.jpg",
        title: "Verein 1994",
        children: [
          { src: "pics/verein94.jpg", 
            title: "Verein 1994",
            description: "Der Schachclub Laufenburg im Jubiläumsjahr 1994 Die hintere Reihe von links: Wolfgang Scheina (Jugendwart), Waldemar Schlotthauer, Karl-Heinz Safran(Bezirksvorsitzender), Christian Jordan (halb verdeckt), Martin Narkawitz (Kassier) Die mittlere Reihe von links: Herbert Müller (1. Vorsitzender), Heinz Meyer (2. Vorsitzender), Dieter Studinger, Elmar Kohlhöfer (Schriftführer und Spielleiter), Lily Spielmann, Monika Witt, Siegfried Korb (Vereinsmitbegründer und Ehrenmitglied) Die vordere Reihe von links:  Franz Baumgartner, Josef Hauser (Ehrenmitglied), Karl-Heinz Pflaum, Josef Ebner, Johannes Kiliani, Frank Kuttruff, Klara Lörracher Nicht anwesend: Bernhard Bürgin, Dieter Hiob, Monika Keller, Helmut Neisius, Klaus-Dieter Oeschger, Peter Schaffrin, Manfred Schmid, Dankmar Schneevoigt, Hans Schütz ",
          },
        ],
      },
      {
        src: "pics/vorstand94.jpg",
        title: "Vorstand 1994",
        children: [
          { src: "pics/vorstand94.jpg", 
            title: "Vorstand 1994",
            description: "von links: 2. Vorsitzender Heinz Meyer, Spielleiter und Jugendwart Wolfgang Scheina, 1. Vorsitzender Herbert Müller, Schriftführer Elmar Kohlhöfer, Kassier Martin Narkawitz, Schachwart Siegfried Korb" 
          }
        ],
      },
      {
        src: "pics/ehrungen_92/ehrung92_4.jpg",
        title: "Ehrungen 92",
        children: [
          { src: "pics/ehrungen_92/ehrung92_4.jpg", 
            title: "Ehrungen 92",
            description: "Sieger der Gruppe 1 (stehend von links): Kl.-D. Oeschger, K.-H. Pflaum, W. Scheina Sieger der Gruppe 2 (sitzend von links): J. Ebner, K. Lörracher, S. Korb"
          },
          { src: "pics/ehrungen_92/ehrung92_1.jpg", 
            title: "Ehrungen 92",
          },
          { src: "pics/ehrungen_92/ehrung92_2.jpg", 
            title: "Ehrungen 92",
          },
          { src: "pics/ehrungen_92/ehrung92_3.jpg", 
            title: "Ehrungen 92",
          },
          { src: "pics/ehrungen_92/ehrung92_5.jpg", 
            title: "Ehrungen 92",
          }
        ],
      },
      {
        src: "pics/freiland88.jpg",
        title: "Freilandschach 1988",
        children: [
          { src: "pics/freiland88.jpg", 
            title: "Freilandschach 1988",
            description: "Josef Hauser, Siegfried Korb und Elmar Kohlhöfer (von links) nach der Einweihung des neuen Freilandschachs an der Gärtnerklause." 
          },
          { src: "pics/freiland88_2.jpg", 
            title: "Freilandschach 1988",
            description: "Vertieft ins Spiel: Hauser (links) gegen Kohlhöfer (rechts). Korb (Mitte) schaut kritisch zu." 
          }
        ],
      },
      {
        src: "pics/kortschnoi86.jpg",
        title: "Kortschnoi 1986",
        children: [
          { src: "pics/kortschnoi86.jpg", 
            title: "Kortschnoi 1986",
            description: "Bei einer Simultanveranstaltung in Lörrach-Brombach 1986 erzielt  K.-D. Oeschger als einziger von 30 Gegnern ein Remis gegen Viktor Kortschnoi" 
          }
        ],
      },
      {
        src: "pics/stadtm85_86.jpg",
        title: "Meisterschaft 1985/86",
        children: [
          { src: "pics/stadtm85_86.jpg", 
            title: "Meisterschaft 1985/86",
            description: "Vereinsvorsitzender Martin Narkawitz verleiht den Stadtmeisterpokal 1986 an Klaus-Dieter Oeschger, gefolgt von Franz Baumgartner und Wolfgang Scheina (von rechts)" 
          }
        ],
      },
      {
        src: "pics/stadtm84_85.jpg",
        title: "Meisterschaft 1984/85",
        children: [
          { src: "pics/stadtm84_85.jpg", 
            title: "Meisterschaft 1984/85" 
          }
        ],
      },
      {
        src: "pics/verein84.jpg",
        title: "Verein 1984",
        children: [
          { src: "pics/verein84.jpg", 
            title: "Verein 1984",
            description: "Der Schachclub Laufenburg bei seinem 15jährigen Bestehen" 
          }
        ],
      },
      {
        src: "pics/ehrungen84.jpg",
        title: "Ehrungen 1984",
        children: [
          { src: "pics/ehrungen84.jpg", 
            title: "Ehrungen 1984",
            description: "von links: Klaus-Dieter Oeschger, Gerhard Moehler und Ludwig Schmid (Gruppe 1), Siegfried Korb, Josef Hauser und Christian Jordan (Gruppe 2)" 
          }
        ],
      },
      {
        src: "pics/freiland_82.jpg",
        title: "Freilandschach 1982",
        children: [
          { src: "pics/freiland_82.jpg", 
            title: "Freilandschach 1982",
            description: "Elmar Kohlhöfer und Wolfgang Scheina (v.l.)  am Freilandschach an der Rheinpromenade." 
          }
        ],
      },
      {
        src: "pics/ehrung_79.jpg",
        title: "Ehrung 1979",
        children: [
          { src: "pics/ehrung_79.jpg", 
            title: "Ehrung 1979" 
          }
        ],
      },
      {
        src: "pics/jubi_79.jpg",
        title: "Jubiläum 1979",
        children: [
          { src: "pics/jubi_79.jpg", 
            title: "Jubiläum 1979",
            description: "Der Schachclub Laufenburg beim 10jährigen Jubiläum von links Dr. G. Brachtl, S. Korb, W. Watzek, J. Hauser, K. Lörracher, H. Müller" 
          }
        ],
      },
      {
        src: "pics/vereinslokal78.jpg",
        title: "Im Vereinslokal 1978",
        children: [
          { src: "pics/vereinslokal78.jpg", 
            title: "Im Vereinslokal 1978",
            description: "Spielabend im Vereinslokal Gärtnerklause 1978" 
          }
        ],
      },
      {
        src: "pics/mannschaft77.jpg",
        title: "Meistermannschaft 1977",
        children: [
          { src: "pics/mannschaft77.jpg", 
            title: "Meistermannschaft 1977" 
          }
        ],
      },
      {
        src: "pics/turnier75.jpg",
        title: "Schachturnier 1975",
        children: [
          { src: "pics/turnier75.jpg", 
            title: "Schachturnier 1975",
            description: "36 Jugendliche und Erwachsene nahmen 1975 an einem Turnier für nichtorganisierte Schachspieler teil, das vom Schachclub Laufenburg veranstaltet wurde." 
          }
        ],
      },
      {
        src: "pics/stadtm72_73.jpg",
        title: "Meisterschaft 1972/73",
        children: [
          { src: "pics/stadtm72_73.jpg", 
            title: "Meisterschaft 1972/73",
            description: "Die Gruppensieger der Stadtmeisterschaft von links: Frau Engelmann, Christian Jordan, Frau Lörracher, Gernot Hein, K.-D. Oeschger, Josef Hauser" 
          }
        ],
      },
      {
        src: "pics/freiland_71/freiland71_8.jpg",
        title: "Freiland 1971",
        children: [
          { src: "pics/freiland_71/freiland71_8.jpg",
            title: "Freiland 1971" 
          },
          { src: "pics/freiland_71/freiland71_1.jpg",
            title: "Freiland 1971" 
          },
          { src: "pics/freiland_71/freiland71_2.jpg",
            title: "Freiland 1971" 
          },
          { src: "pics/freiland_71/freiland71_3.jpg",
            title: "Freiland 1971" 
          },
          { src: "pics/freiland_71/freiland71_4.jpg",
            title: "Freiland 1971" 
          },
          { src: "pics/freiland_71/freiland71_5.jpg",
            title: "Freiland 1971" 
          }, 
          { src: "pics/freiland_71/freiland71_6.jpg",
            title: "Freiland 1971" 
          }, 
          { src: "pics/freiland_71/freiland71_7.jpg",
            title: "Freiland 1971" 
          }, 
          { src: "pics/freiland_71/freiland71_8.jpg",
            title: "Freiland 1971" 
          }
        ],
      },
      {
        src: "pics/freiland71.jpg",
        title: "Freilandschach 1971",
        children: [
          { src: "pics/freiland71.jpg", 
            title: "Freilandschach 1971" 
          }
        ],
      },
      {
        src: "pics/gruendung69.jpg",
        title: "Gründung des Schachclubs Laufenburg 1969",
        children: [
          { src: "pics/gruendung69.jpg", 
            title: "Gründung des Schachclubs Laufenburg 1969",
            description: "Die erste Abteilungsleitung (von links): Siegfried Korb (Abteilungsleiter), Manfred Flum (Kassier) und Friedrich Dietsche (Spielleiter)" 
          }
        ],
      },
  ];