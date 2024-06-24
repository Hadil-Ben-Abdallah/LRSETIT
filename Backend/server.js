// import multer from 'multer'
// import path from 'path'


const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const moment = require('moment')


const app = express()
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/Frontend/public/css'), 
));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ursetit_node'
})

app.post('/new-project', (req, res) => {
  const sql = "INSERT INTO new_projects (`annéeProj`, `codeProj`, `catégorieProj`, `typeProj`, `intituléProj`,  `coordinateurProj`, `budgetProj`) VALUES (?)";

  const values = [
    req.body.annéeProj,
    req.body.codeProj,
    req.body.catégorieProj,
    req.body.typeProj,
    req.body.intituléProj,
    req.body.coordinateurProj,
    req.body.budgetProj,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.post('/inscription', (req, res) => {
  const { emailInsc, cinInsc } = req.body;

  // Query to check if email or CIN already exists
  const checkDuplicateSql = "SELECT emailInsc, cinInsc FROM inscriptions WHERE emailInsc = ? OR cinInsc = ?";

  db.query(checkDuplicateSql, [emailInsc, cinInsc], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      const duplicateFields = {};
      results.forEach(result => {
        if (result.emailInsc === emailInsc) {
          duplicateFields.emailInsc = 'L\'email existe déjà';
        }
        if (result.cinInsc === cinInsc) {
          duplicateFields.cinInsc = 'Le CIN existe déjà';
        }
      });
      return res.status(409).json({ errors: duplicateFields });
    }

    // If no duplicates, proceed to insert the new record
    const insertSql = "INSERT INTO inscriptions (`ministereInsc`, `universiteInsc`, `etablissementInsc`, `cinInsc`, `numPassInsc`,  `cnrpsInsc`, `nomInsc`, `prenomInsc`, `emailInsc`, `dateNaissanceInsc`, `genreInsc`, `photoInsc`, `fonctionInsc`, `gradeInsc`, `specialiteInsc`, `diplomeInsc`, `dateDiplomeInsc`, `indexInsc`, `identificationInsc`, `telFixeInsc`, `telMobileInsc`, `faxInsc`) VALUES (?)";
    const values = [
      req.body.ministereInsc,
      req.body.universiteInsc,
      req.body.etablissementInsc,
      req.body.cinInsc,
      req.body.numPassInsc,
      req.body.cnrpsInsc,
      req.body.nomInsc,
      req.body.prenomInsc,
      req.body.emailInsc,
      req.body.dateNaissanceInsc,
      req.body.genreInsc,
      req.body.photoInsc,
      req.body.fonctionInsc,
      req.body.gradeInsc,
      req.body.specialiteInsc,
      req.body.diplomeInsc,
      req.body.dateDiplomeInsc,
      req.body.indexInsc,
      req.body.identificationInsc,
      req.body.telFixeInsc,
      req.body.telMobileInsc,
      req.body.faxInsc,
    ];
    
    db.query(insertSql, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json(data);
    });
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT cinInsc FROM inscriptions WHERE emailInsc = ? AND cinInsc = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.json({ success: false, message: err.message });
    if (results.length > 0) {
      const cinInsc = results[0].cinInsc;
      return res.json({ success: true, cinInsc });
    } else {
      return res.json({ success: false, message: 'Invalid email or password' });
    }
  });
});

app.get('/inscriptions/:cinInsc', (req, res) => {
  const { cinInsc } = req.params;
  const sql = "SELECT * FROM inscriptions WHERE cinInsc = ?";
  db.query(sql, [cinInsc], (err, result) => {
    if (err) {
      return res.json({ message: "Server error" });
    }

    const formattedResult = result.map((record) => {
      return {
        ...record,
        dateNaissanceInsc: record.dateNaissanceInsc ? moment(record.dateNaissanceInsc).format('DD-MM-YYYY') : null,
        dateDiplomeInsc: record.dateDiplomeInsc ? moment(record.dateDiplomeInsc).format('DD-MM-YYYY') : null,
      };
    });

    return res.json({ Data: formattedResult });
  });
});


app.get("/new_projects", (req, res) => {
  const sql = "SELECT * FROM new_projects ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})



app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeProj) {
    columns.push("`annéeProj`=?");
    values.push(req.body.annéeProj);
  }
  if (req.body.codeProj) {
    columns.push("`codeProj`=?");
    values.push(req.body.codeProj);
  }
  if (req.body.catégorieProj) {
    columns.push("`catégorieProj`=?");
    values.push(req.body.catégorieProj);
  }
  if (req.body.typeProj) {
    columns.push("`typeProj`=?");
    values.push(req.body.typeProj);
  }
  if (req.body.intituléProj) {
    columns.push("`intituléProj`=?");
    values.push(req.body.intituléProj);
  }
  if (req.body.coordinateurProj) {
    columns.push("`coordinateurProj`=?");
    values.push(req.body.coordinateurProj);
  }
  if (req.body.budgetProj) {
    columns.push("`budgetProj`=?");
    values.push(req.body.budgetProj);
  }

  // Add similar checks for other columns...

  const sql = `UPDATE new_projects SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_projects WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Project not found' });
    } else {
      res.json({ message: 'Project deleted successfully' });
    }
  });
});




app.post('/new-article', (req, res) => {
  const sql = "INSERT INTO new_articles (`annéeArt`, `titreArt`, `lienArt`, `datePubArt`, `fileArt`,  `cinAutArt`, `ordreAutArt`, `nomAutArt`, `prénomAutArt`, `identifiantAutArt`, `emailAutArt`, `paysAutArt`, `titreJourArt`, `listesJourArt`, `quartileArt`, `volumeArt`, `facteurArt`, `indexationArt`, `siteArt`) VALUES (?)";

  const values = [
    req.body.annéeArt,
    req.body.titreArt,
    req.body.lienArt,
    req.body.datePubArt,
    req.body.fileArt,
    req.body.cinAutArt,
    req.body.ordreAutArt,
    req.body.nomAutArt,
    req.body.prénomAutArt,
    req.body.identifiantAutArt,
    req.body.emailAutArt,
    req.body.paysAutArt,
    req.body.titreJourArt,
    req.body.listesJourArt,
    req.body.quartileArt,
    req.body.volumeArt,
    req.body.facteurArt,
    req.body.indexationArt,
    req.body.siteArt,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.get("/new_articles", (req, res) => {
  const sql = "SELECT * FROM new_articles ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})

app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeArt) {
    columns.push("`annéeArt`=?");
    values.push(req.body.annéeArt);
  }
  if (req.body.titreArt) {
    columns.push("`titreArt`=?");
    values.push(req.body.titreArt);
  }
  if (req.body.lienArt) {
    columns.push("`lienArt`=?");
    values.push(req.body.lienArt);
  }
  if (req.body.datePubArt) {
    columns.push("`datePubArt`=?");
    values.push(req.body.datePubArt);
  }
  if (req.body.fileArt) {
    columns.push("`fileArt`=?");
    values.push(req.body.fileArt);
  }
  if (req.body.cinAutArt) {
    columns.push("`cinAutArt`=?");
    values.push(req.body.cinAutArt);
  }
  if (req.body.ordreAutArt) {
    columns.push("`ordreAutArt`=?");
    values.push(req.body.ordreAutArt);
  }
  if (req.body.nomAutArt) {
    columns.push("`nomAutArt`=?");
    values.push(req.body.nomAutArt);
  }
  if (req.body.prénomAutArt) {
    columns.push("`prénomAutArt`=?");
    values.push(req.body.prénomAutArt);
  }
  if (req.body.identifiantAutArt) {
    columns.push("`identifiantAutArt`=?");
    values.push(req.body.identifiantAutArt);
  }
  if (req.body.emailAutArt) {
    columns.push("`emailAutArt`=?");
    values.push(req.body.emailAutArt);
  }
  if (req.body.paysAutArt) {
    columns.push("`paysAutArt`=?");
    values.push(req.body.paysAutArt);
  }
  if (req.body.titreJourArt) {
    columns.push("`titreJourArt`=?");
    values.push(req.body.titreJourArt);
  }
  if (req.body.listesJourArt) {
    columns.push("`listesJourArt`=?");
    values.push(req.body.listesJourArt);
  }
  if (req.body.quartileArt) {
    columns.push("`quartileArt`=?");
    values.push(req.body.quartileArt);
  }
  if (req.body.volumeArt) {
    columns.push("`volumeArt`=?");
    values.push(req.body.volumeArt);
  }
  if (req.body.facteurArt) {
    columns.push("`facteurArt`=?");
    values.push(req.body.facteurArt);
  }
  if (req.body.indexationArt) {
    columns.push("`indexationArt`=?");
    values.push(req.body.indexationArt);
  }
  if (req.body.siteArt) {
    columns.push("`siteArt`=?");
    values.push(req.body.siteArt);
  }

  // Add similar checks for other columns...

  const sql = `UPDATE new_articles SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});




app.delete('/delete_article/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_articles WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Article not found' });
    } else {
      res.json({ message: 'Article deleted successfully' });
    }
  });
});





app.post('/new-ouvrage', (req, res) => {
  const sql = "INSERT INTO new_ouvrages (`annéeOuv`, `cinAutOuv`, `ordreAutOuv`, `nomAutOuv`, `prénomAutOuv`,  `identifiantAutOuv`, `emailAutOuv`, `paysAutOuv`, `titreOuv`, `éditeurOuv`, `lienOuv`, `éditionOuv`, `isbnOuv`, `dateOuv`) VALUES (?)";

  const values = [
    req.body.annéeOuv,
    req.body.cinAutOuv,
    req.body.ordreAutOuv,
    req.body.nomAutOuv,
    req.body.prénomAutOuv,
    req.body.identifiantAutOuv,
    req.body.emailAutOuv,
    req.body.paysAutOuv,
    req.body.titreOuv,
    req.body.éditeurOuv,
    req.body.lienOuv,
    req.body.éditionOuv,
    req.body.isbnOuv,
    req.body.dateOuv,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.get("/new_ouvrages", (req, res) => {
  const sql = "SELECT * FROM new_ouvrages ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})

app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeOuv) {
    columns.push("`annéeOuv`=?");
    values.push(req.body.annéeOuv);
  }
  if (req.body.cinAutOuv) {
    columns.push("`cinAutOuv`=?");
    values.push(req.body.cinAutOuv);
  }
  if (req.body.ordreAutOuv) {
    columns.push("`ordreAutOuv`=?");
    values.push(req.body.ordreAutOuv);
  }
  if (req.body.nomAutOuv) {
    columns.push("`nomAutOuv`=?");
    values.push(req.body.nomAutOuv);
  }
  if (req.body.prénomAutOuv) {
    columns.push("`prénomAutOuv`=?");
    values.push(req.body.prénomAutOuv);
  }
  if (req.body.identifiantAutOuv) {
    columns.push("`identifiantAutOuv`=?");
    values.push(req.body.identifiantAutOuv);
  }
  if (req.body.emailAutOuv) {
    columns.push("`emailAutOuv`=?");
    values.push(req.body.emailAutOuv);
  }
  if (req.body.paysAutOuv) {
    columns.push("`paysAutOuv`=?");
    values.push(req.body.paysAutOuv);
  }
  if (req.body.titreOuv) {
    columns.push("`titreOuv`=?");
    values.push(req.body.titreOuv);
  }
  if (req.body.éditeurOuv) {
    columns.push("`éditeurOuv`=?");
    values.push(req.body.éditeurOuv);
  }
  if (req.body.lienOuv) {
    columns.push("`lienOuv`=?");
    values.push(req.body.lienOuv);
  }
  if (req.body.éditionOuv) {
    columns.push("`éditionOuv`=?");
    values.push(req.body.éditionOuv);
  }
  if (req.body.isbnOuv) {
    columns.push("`isbnOuv`=?");
    values.push(req.body.isbnOuv);
  }
  if (req.body.dateOuv) {
    columns.push("`dateOuv`=?");
    values.push(req.body.dateOuv);
  }

  // Add similar checks for other columns...

  const sql = `UPDATE new_ouvrages SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete('/delete_ouvrage/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_ouvrages WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Ouvrage not found' });
    } else {
      res.json({ message: 'Ouvrage deleted successfully' });
    }
  });
});





app.post('/new-chapitre', (req, res) => {
  const sql = "INSERT INTO new_chapitres (`annéeChap`, `cinAutChap`, `ordreAutChap`, `nomAutChap`, `prénomAutChap`,  `identifiantAutChap`, `emailAutChap`, `paysAutChap`, `titreChap`, `éditeurChap`, `lienChap`, `éditionChap`, `isbnChap`, `dateChap`) VALUES (?)";

  const values = [
    req.body.annéeChap,
    req.body.cinAutChap,
    req.body.ordreAutChap,
    req.body.nomAutChap,
    req.body.prénomAutChap,
    req.body.identifiantAutChap,
    req.body.emailAutChap,
    req.body.paysAutChap,
    req.body.titreChap,
    req.body.éditeurChap,
    req.body.lienChap,
    req.body.éditionChap,
    req.body.isbnChap,
    req.body.dateChap,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.get("/new_chapitres", (req, res) => {
  const sql = "SELECT * FROM new_chapitres ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})

app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeChap) {
    columns.push("`annéeChap`=?");
    values.push(req.body.annéeChap);
  }
  if (req.body.cinAutChap) {
    columns.push("`cinAutChap`=?");
    values.push(req.body.cinAutChap);
  }
  if (req.body.ordreAutChap) {
    columns.push("`ordreAutChap`=?");
    values.push(req.body.ordreAutChap);
  }
  if (req.body.nomAutChap) {
    columns.push("`nomAutChap`=?");
    values.push(req.body.nomAutChap);
  }
  if (req.body.prénomAutChap) {
    columns.push("`prénomAutChap`=?");
    values.push(req.body.prénomAutChap);
  }
  if (req.body.identifiantAutChap) {
    columns.push("`identifiantAutChap`=?");
    values.push(req.body.identifiantAutChap);
  }
  if (req.body.emailAutChap) {
    columns.push("`emailAutChap`=?");
    values.push(req.body.emailAutChap);
  }
  if (req.body.paysAutChap) {
    columns.push("`paysAutChap`=?");
    values.push(req.body.paysAutChap);
  }
  if (req.body.titreChap) {
    columns.push("`titreChap`=?");
    values.push(req.body.titreChap);
  }
  if (req.body.éditeurChap) {
    columns.push("`éditeurChap`=?");
    values.push(req.body.éditeurChap);
  }
  if (req.body.lienChap) {
    columns.push("`lienChap`=?");
    values.push(req.body.lienChap);
  }
  if (req.body.éditionChap) {
    columns.push("`éditionChap`=?");
    values.push(req.body.éditionChap);
  }
  if (req.body.isbnChap) {
    columns.push("`isbnChap`=?");
    values.push(req.body.isbnChap);
  }
  if (req.body.dateChap) {
    columns.push("`dateChap`=?");
    values.push(req.body.dateChap);
  }

  // Add similar checks for other columns...

  const sql = `UPDATE new_chapitres SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete('/delete_chapitre/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_chapitres WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Chapitre not found' });
    } else {
      res.json({ message: 'Chapitre deleted successfully' });
    }
  });
});




app.post('/new-brevet', (req, res) => {
  const sql = "INSERT INTO new_brevets (`annéeBrev`, `référanceBrev`, `fileBrev`, `dateBrev`, `indexationBrev`) VALUES (?)";

  const values = [
    req.body.annéeBrev,
    req.body.référanceBrev,
    req.body.fileBrev,
    req.body.dateBrev,
    req.body.indexationBrev,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.get("/new_brevets", (req, res) => {
  const sql = "SELECT * FROM new_brevets ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})

app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeBrev) {
    columns.push("`annéeBrev`=?");
    values.push(req.body.annéeBrev);
  }
  if (req.body.référanceBrev) {
    columns.push("`référanceBrev`=?");
    values.push(req.body.référanceBrev);
  }
  if (req.body.fileBrev) {
    columns.push("`fileBrev`=?");
    values.push(req.body.fileBrev);
  }
  if (req.body.dateBrev) {
    columns.push("`dateBrev`=?");
    values.push(req.body.dateBrev);
  }
  if (req.body.indexationBrev) {
    columns.push("`indexationBrev`=?");
    values.push(req.body.indexationBrev);
  }

  // Add similar checks for other columns...

  const sql = `UPDATE new_brevets SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete('/delete_brevet/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_brevets WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Brevet not found' });
    } else {
      res.json({ message: 'Brevet deleted successfully' });
    }
  });
});


app.post('/new-obtention', (req, res) => {
  const sql = "INSERT INTO new_obtentions (`annéeObt`, `titreObt`, `référanceObt`, `fileObt`, `dateObt`) VALUES (?)";

  const values = [
    req.body.annéeObt,
    req.body.titreObt,
    req.body.référanceObt,
    req.body.fileObt,
    req.body.dateObt,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.get("/new_obtentions", (req, res) => {
  const sql = "SELECT * FROM new_obtentions ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})

app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeObt) {
    columns.push("`annéeObt`=?");
    values.push(req.body.annéeObt);
  }
  if (req.body.titreObt) {
    columns.push("`titreObt`=?");
    values.push(req.body.titreObt);
  }
  if (req.body.référanceObt) {
    columns.push("`référanceObt`=?");
    values.push(req.body.référanceObt);
  }
  if (req.body.fileObt) {
    columns.push("`fileObt`=?");
    values.push(req.body.fileObt);
  }
  if (req.body.dateObt) {
    columns.push("`dateObt`=?");
    values.push(req.body.dateObt);
  }

  // Add similar checks for other columns...

  const sql = `UPDATE new_obtentions SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete('/delete_obtention/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_obtentions WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Obtention not found' });
    } else {
      res.json({ message: 'Obtention deleted successfully' });
    }
  });
});



app.post('/new-habilitation', (req, res) => {
  const sql = "INSERT INTO new_habilitations (`annéeHabi`, `titreHabi`, `nomHabi`, `fileHabi`, `encadrantHabi`, `dateHabi`) VALUES (?)";

  const values = [
    req.body.annéeHabi,
    req.body.titreHabi,
    req.body.nomHabi,
    req.body.fileHabi,
    req.body.encadrantHabi,
    req.body.dateHabi,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.get("/new_habilitations", (req, res) => {
  const sql = "SELECT * FROM new_habilitations ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})

app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeHabi) {
    columns.push("`annéeHabi`=?");
    values.push(req.body.annéeHabi);
  }
  if (req.body.titreHabi) {
    columns.push("`titreHabi`=?");
    values.push(req.body.titreHabi);
  }
  if (req.body.nomHabi) {
    columns.push("`nomHabi`=?");
    values.push(req.body.nomHabi);
  }
  if (req.body.fileHabi) {
    columns.push("`fileHabi`=?");
    values.push(req.body.fileHabi);
  }
  if (req.body.encadrantHabi) {
    columns.push("`encadrantHabi`=?");
    values.push(req.body.encadrantHabi);
  }
  if (req.body.dateHabi) {
    columns.push("`dateHabi`=?");
    values.push(req.body.dateHabi);
  }

  // Add similar checks for other columns...

  const sql = `UPDATE new_habilitations SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete('/delete_habilitation/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_habilitations WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Habilitation not found' });
    } else {
      res.json({ message: 'Habilitation deleted successfully' });
    }
  });
});



app.post('/new-these', (req, res) => {
  const sql = "INSERT INTO new_theses (`annéeThes`, `titreThes`, `sujetThes`, `annéeInscThes`, `mémoireThes`, `encadrantThes`, `cotutelleThes`) VALUES (?)";

  const values = [
    req.body.annéeThes,
    req.body.titreThes,
    req.body.sujetThes,
    req.body.annéeInscThes,
    req.body.mémoireThes,
    req.body.encadrantThes,
    req.body.cotutelleThes,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.get("/new_theses", (req, res) => {
  const sql = "SELECT * FROM new_theses ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})

app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeThes) {
    columns.push("`annéeThes`=?");
    values.push(req.body.annéeThes);
  }
  if (req.body.titreThes) {
    columns.push("`titreThes`=?");
    values.push(req.body.titreThes);
  }
  if (req.body.sujetThes) {
    columns.push("`sujetThes`=?");
    values.push(req.body.sujetThes);
  }
  if (req.body.annéeInscThes) {
    columns.push("`annéeInscThes`=?");
    values.push(req.body.annéeInscThes);
  }
  if (req.body.mémoireThes) {
    columns.push("`mémoireThes`=?");
    values.push(req.body.mémoireThes);
  }
  if (req.body.encadrantThes) {
    columns.push("`encadrantThes`=?");
    values.push(req.body.encadrantThes);
  }
  if (req.body.cotutelleThes) {
    columns.push("`cotutelleThes`=?");
    values.push(req.body.cotutelleThes);
  }

  // Add similar checks for other columns...

  const sql = `UPDATE new_theses SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete('/delete_these/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_theses WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'These not found' });
    } else {
      res.json({ message: 'These deleted successfully' });
    }
  });
});



app.post('/new-mastere', (req, res) => {
  const sql = "INSERT INTO new_masteres (`annéeMast`, `nomMast`, `annéeInscMast`, `mémoireMast`, `sujetMast`, `encadrantMast`) VALUES (?)";

  const values = [
    req.body.annéeMast,
    req.body.nomMast,
    req.body.annéeInscMast,
    req.body.mémoireMast,
    req.body.sujetMast,
    req.body.encadrantMast,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.get("/new_masteres", (req, res) => {
  const sql = "SELECT * FROM new_masteres ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})

app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeMast) {
    columns.push("`annéeMast`=?");
    values.push(req.body.annéeMast);
  }
  if (req.body.nomMast) {
    columns.push("`nomMast`=?");
    values.push(req.body.nomMast);
  }
  if (req.body.annéeInscMast) {
    columns.push("`annéeInscMast`=?");
    values.push(req.body.annéeInscMast);
  }
  if (req.body.mémoireMast) {
    columns.push("`mémoireMast`=?");
    values.push(req.body.mémoireMast);
  }
  if (req.body.sujetMast) {
    columns.push("`sujetMast`=?");
    values.push(req.body.sujetMast);
  }
  if (req.body.encadrantMast) {
    columns.push("`encadrantMast`=?");
    values.push(req.body.encadrantMast);
  }

  // Add similar checks for other columns...

  const sql = `UPDATE new_masteres SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete('/delete_mastere/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_masteres WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Mastere not found' });
    } else {
      res.json({ message: 'Mastere deleted successfully' });
    }
  });
});



app.post('/new-manifestation', (req, res) => {
  const sql = "INSERT INTO new_manifestations (`annéeMan`, `titreMan`, `organisateursMan`, `dateMan`, `lieuMan`, `typeMan`, `siteMan`) VALUES (?)";

  const values = [
    req.body.annéeMan,
    req.body.titreMan,
    req.body.organisateursMan,
    req.body.dateMan,
    req.body.lieuMan,
    req.body.typeMan,
    req.body.siteMan,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.get("/new_manifestations", (req, res) => {
  const sql = "SELECT * FROM new_manifestations ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})

app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeMan) {
    columns.push("`annéeMan`=?");
    values.push(req.body.annéeMan);
  }
  if (req.body.titreMan) {
    columns.push("`titreMan`=?");
    values.push(req.body.titreMan);
  }
  if (req.body.organisateursMan) {
    columns.push("`organisateursMan`=?");
    values.push(req.body.organisateursMan);
  }
  if (req.body.dateMan) {
    columns.push("`dateMan`=?");
    values.push(req.body.dateMan);
  }
  if (req.body.lieuMan) {
    columns.push("`lieuMan`=?");
    values.push(req.body.lieuMan);
  }
  if (req.body.typeMan) {
    columns.push("`typeMan`=?");
    values.push(req.body.typeMan);
  }
  if (req.body.siteMan) {
    columns.push("`siteMan`=?");
    values.push(req.body.siteMan);
  }

  // Add similar checks for other columns...

  const sql = `UPDATE new_manifestations SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete('/delete_manifestation/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_manifestations WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Manifestation not found' });
    } else {
      res.json({ message: 'Manifestation deleted successfully' });
    }
  });
});



app.post('/new-convention', (req, res) => {
  const sql = "INSERT INTO new_conventions (`annéeConv`, `nationalConv`, `partenaireConv`, `typeConv`, `résuméConv`, `impactFinConv`, `impactNatConv`, `dateConv`, `fileConv`) VALUES (?)";

  const values = [
    req.body.annéeConv,
    req.body.nationalConv,
    req.body.partenaireConv,
    req.body.typeConv,
    req.body.résuméConv,
    req.body.impactFinConv,
    req.body.impactNatConv,
    req.body.dateConv,
    req.body.fileConv,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


app.get("/new_conventions", (req, res) => {
  const sql = "SELECT * FROM new_conventions ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error"});
    return res.json({Data: result});
  })
})

app.put('/update/:id', (req, res) => {
  const columns = [];
  const values = [];

  if (req.body.annéeConv) {
    columns.push("`annéeConv`=?");
    values.push(req.body.annéeConv);
  }
  if (req.body.nationalConv) {
    columns.push("`nationalConv`=?");
    values.push(req.body.nationalConv);
  }
  if (req.body.partenaireConv) {
    columns.push("`partenaireConv`=?");
    values.push(req.body.partenaireConv);
  }
  if (req.body.typeConv) {
    columns.push("`typeConv`=?");
    values.push(req.body.typeConv);
  }
  if (req.body.résuméConv) {
    columns.push("`résuméConv`=?");
    values.push(req.body.résuméConv);
  }
  if (req.body.impactFinConv) {
    columns.push("`impactFinConv`=?");
    values.push(req.body.impactFinConv);
  }
  if (req.body.impactNatConv) {
    columns.push("`impactNatConv`=?");
    values.push(req.body.impactNatConv);
  }
  if (req.body.dateConv) {
    columns.push("`dateConv`=?");
    values.push(req.body.dateConv);
  }
  if (req.body.fileConv) {
    columns.push("`fileConv`=?");
    values.push(req.body.fileConv);
  }
  // Add similar checks for other columns...

  const sql = `UPDATE new_conventions SET ${columns.join(', ')} WHERE id=?`;
  const id = req.params.id;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.delete('/delete_convention/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM new_conventions WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Convention not found' });
    } else {
      res.json({ message: 'Convention deleted successfully' });
    }
  });
});






app.get("/get_user/:cinInsc", (req, res) => {
  const cinInsc = req.params.cinInsc;
  const sql = "SELECT * FROM inscriptions WHERE cinInsc = ?";
  db.query(sql, [cinInsc], (err, result) => {
    if (err) return res.json({ message: "Server error" });
    return res.json(result);
  });
});



app.put('/update/:cinInsc', (req, res) => {
  const cinInsc = req.params.cinInsc;
  const updatedData = req.body;

  console.log('Updating user with CIN:', cinInsc);
  console.log('New data:', updatedData);

  const updateSql = "UPDATE inscriptions SET ? WHERE cinInsc = ?";
  console.log('SQL query:', updateSql);

  db.query(updateSql, [updatedData, cinInsc], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Check if any rows were affected by the update
    if (result.affectedRows === 0) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Return a success message or the updated user data
    console.log('User updated successfully');
    return res.status(200).json({ message: 'Successfully updated', updatedData });
  });
});


app.listen(8081, ()=> {
  console.log("Listening...");
})