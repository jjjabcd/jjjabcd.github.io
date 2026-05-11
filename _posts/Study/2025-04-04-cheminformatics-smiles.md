---\r\ntoc:\r\n  sidebar: left
layout: post
title: "SMILES ?쒓린踰?
date: 2025-04-04
categories: [Study]
tags:
  - cheminformatics
  - molecular-representation
description: "Test post for Linux category."
---\r\ntoc:\r\n  sidebar: left

?쒕몢 以??뚯뒪???댁슜?낅땲??

## 遺꾩옄援ъ“ ?쒓린踰??뚭컻

?뷀븰 遺꾩옄瑜??쒗쁽?섎뒗 諛⑸쾿? ?ш쾶 ?щ엺???쎄린 ?ъ슫(Human-readable) 諛⑹떇怨?而댄벂?곌? ?쎄린 ?ъ슫(Computer-readable) 諛⑹떇?쇰줈 ?섎닃 ???덈떎.

- ?щ엺???쎄린 ?ъ슫 諛⑹떇 (Human-readable)
  - Condensed Formula (異뺤빟 援ъ“??
  - Kekul챕 Diagram (Lewis Structure瑜?湲곕컲?쇰줈 ??Bond ?쒓린)
  - Bond-Line Formula (zig-zag ?뺥깭??怨④꺽 援ъ“)

- 而댄벂?곌? ?쎄린 ?ъ슫 諛⑹떇 (Computer-readable)
  - SMILES (Simplified Molecular Input Line Entry System)
  - IUPAC (International Union of Pure and Applied Chemistry)
  - InChI (International Chemical Identifier)
  - SELFIES (Self-Referencing Embedded Strings)
  - SMARTS

??以?SMILES??臾몄옄??湲곕컲?쇰줈 遺꾩옄 援ъ“瑜??쒗쁽?섎뒗 ??쒖쟻???щ㎎?쇰줈, 媛꾨떒???띿뒪?몃줈 ?뷀빀臾쇱쓣 吏곴??곸쑝濡?湲곗닠?????덈떎???μ젏???덈떎.

---\r\ntoc:\r\n  sidebar: left

## ?щ엺???쎄린 ?ъ슫 諛⑹떇 (Human-readable) ??
### Name

- Propanal

### Kekul챕

![image.png](/assets/blog/2025-04-04-cheminformatics-smiles/fig1.png)

### Condensed Formula

- $CH_3CH_2CHO$

### Bond-line

![image.png](/assets/blog/2025-04-04-cheminformatics-smiles/fig2.png)

## 而댄벂?곗뿉???ъ슜?섎뒗 諛⑹떇 (Computer-readable) ??
- SMILES(Simplified Molecular Input Line Entropy System)

## SMILES

SMILES??遺꾩옄援ъ“瑜?string?쇰줈 ?쒗쁽?섎뒗 ?쒓린踰? 遺꾩옄 援ъ“??**,atom, bond, ring, aromaticity, branch** ?깆쓣 ?뱀젙 洹쒖튃???곕씪 臾몄옄?대줈 蹂?섑빀?덈떎. ?뱀젙 ?쒖옉 atom???뺥븯怨? 遺꾩옄援ъ“瑜?DFS ?뚭퀬由ъ쬁???듯빐 SMILES string?쇰줈 諛섑솚?쒕떎.

### SMILES ?쒓린踰뺤쓽 ?μ젏

1. **媛꾧껐??*: ??以꾩쓽 臾몄옄?대줈 蹂듭옟??遺꾩옄 援ъ“瑜??쒗쁽 媛??2. **湲곌퀎 泥섎━ ?⑹씠**: 臾몄옄?댁씠誘濡?DB????ν븯嫄곕굹 ?꾨줈洹몃옩?쇰줈 ?뚯떛?섍린 ?ъ?
3. **媛?낆꽦**: 媛꾨떒??洹쒖튃留??듯엳硫??щ엺???쎄퀬 ?곌린??鍮꾧탳???ъ?
4. 臾몄옄???뺥깭濡??쒗쁽?섍린 ?뚮Ц?? 癒몄떊?щ떇/?λ윭?앹뿉??NLP?먯꽌 ?쒖슜?섎뒗 ?ㅼ뼇???뚭퀬由ъ쬁???ъ슜?????덉쓬

### SMILES ?쒓린踰뺤쓽 ?⑥젏

1. 臾몄옄???먯껜濡?湲곗〈 NLP?먯꽌 ?ъ슜?섎뒗 ?좎궗?? BLUE 洹몃━怨?ROUGE 媛숈? 吏?쒕? ?ъ슜?????놁쓬
2. ?쒕줈 遺꾩옄援ъ“媛 鍮꾩듂?섎뜑?쇰룄 SMILES string ?먯껜??留ㅼ슦 ?щ씪蹂댁씪 ???덉쓬
3. ?쒖옉 atom ?먮뒗 ?쎈뒗 諛⑺뼢???곕씪 媛숈? 遺꾩옄援ъ“?щ룄 SMILES string? ?ㅼ뼇?섍쾶 ?섏삱 ???덉쓬

| Name        | Descriptions                                                                                                                | Examples                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Atoms       | ?뷀븰 ?먯냼???쒖? ?쎌뼱濡??쒗쁽<br>?꾪븯 諛??섏냼瑜?蹂댁뿬二쇨린 ?꾪빐 ?愿꾪샇 ?ъ슜                                                    | B, C, N, O, F, P, S, Cl, Br, I<br>[Au], [Ag], [Cu]<br>[Cl-], [OH-], [NH4+]             |
| Bonds       | ?⑥씪 寃고빀: `-`<br>?댁쨷, ?쇱쨷, ?ъ쨷 寃고빀: `=`, `#`, `$`<br>寃고빀?섏? ?딆? ?쒗쁽: `.`                                           | CCC<br>O=C=O<br>C#N<br>[Ga+]$[As-]<br>[Na+].[Cl-]                                      |
| Rings       | 怨좊━ 寃고빀 ?쒗쁽: ??媛쒖쓽 ?쇱튂?섎뒗 ?뺤닔 ?쇰꺼 ?ъ슜<br>怨좊━ ?レ옄???쒖꽌?濡??ъ슜???꾩슂 ?놁쓬<br>怨좊━ ?ロ옒 ?댄썑 ?レ옄 ?ъ궗??媛??| C1CCCCC1<br>C1CCCC2C1CCCC2<br>C1CCCCC1C2CCCCC2<br>C1CCCCC1C1CCCCC1<br>C1=CC1<br>C=1CC1 |
| Aromaticity | 諛⑺뼢議?怨좊━ ?쒗쁽<br>`:` ?ъ슜 ?먮뒗 ?뚮Ц???먯옄 ?ъ슜                                                                          | C1=CC=CC=C1<br>C:1:C:C:C:C:C1<br>c1ccccc1                                              |
| Branching   | 愿꾪샇瑜??ъ슜?섏뿬 媛吏 援ъ“ ?쒗쁽<br>?묒꽦 ?쒖꽌???먯쑀濡쒖?                                                                      | CCC(=O)O<br>FC(Br)(Cl)F<br>BrC(F)(F)Cl<br>C(F)(Cl)(F)Br                                |

## SMILES example

### Ring & Aromaticity

![image.png](/assets/blog/2025-04-04-cheminformatics-smiles/fig3.png)

### Branch

![image.png](/assets/blog/2025-04-04-cheminformatics-smiles/fig4.png)

### Excercise (1/2)

![image.png](/assets/blog/2025-04-04-cheminformatics-smiles/fig5.png)

### Exercise (2/2)

![image.png](/assets/blog/2025-04-04-cheminformatics-smiles/fig6.png)

### [李멸퀬?먮즺]

---\r\ntoc:\r\n  sidebar: left

[SMILES?쒓린踰뺤씠?? (SMILES representation ?ㅻ챸 諛??λ떒??](https://process-mining.tistory.com/158)

Weininger, D. (1988). SMILES, a chemical language and information system. 1. Introduction to methodology and encoding rules.혻*Journal of chemical information and computer sciences*,혻*28*(1), 31-36.

