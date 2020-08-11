import React from "react";
import "../styles/RulesModal.css";
import { Fade } from "react-awesome-reveal";

const RulesModal = ({ closeModal, lang }) => {
  return (
    <Fade className="rulesModal__wrapper" onClick={closeModal}>
  
      <div className="rulesModal__content">
        <div className="rulesModal__text">
          {lang === "en" && (
            <>
              <h1>Skrabl Rules</h1>
              <p>
                When playing Skrabl, anywhere from one to two players will enjoy
                the game. The object when playing is to score more points than
                other players. As words are placed on the game board, points are
                collected and each letter that is used in the game will have a
                different point value. The main strategy is to play words that
                have the highest possible score based on the combination of
                letters.
              </p>

              <h3>The Skrabl Board</h3>
              <p>
                A Skrabl board will consist of cells that are located in a large
                square grid. The board offers 15 cells high and 15 cells wide.
                The tiles used on the game will fit in each cell on the board.
              </p>

              <h3>Skrabl Tiles</h3>
              <p>
                There are 100 tiles that are used in the game and 98 of them
                will contain letters and point values. There are 2 blank tiles
                that can be used as wild tiles to take the place of any letter.
                When a blank is played, it will remain in the game as the letter
                it substituted for.
              </p>

              <p>
                Different letters in the game will have various point values and
                this will depend on how rare the letter is and how difficult it
                may be to lay that letter. Blank tiles will have no point
                values.
              </p>

              <h3>Tile Values</h3>
              <p>
                Below are the point values for each letter that is used in a
                Skrabl game.
              </p>

              <p>0 Points - Blank tile.</p>

              <p>1 Point - A, E, I, L, N, O, R, S, T and U.</p>

              <p>2 Points - D and G.</p>

              <p>3 Points - B, C, M and P.</p>

              <p>4 Points - F, H, V, W and Y.</p>

              <p>5 Points - K.</p>

              <p>8 Points - J and X.</p>

              <p>10 Points - Q and Z.</p>

              <h3>Extra Point Values</h3>
              <p>
                When looking at the board, players will see that some squares
                offer multipliers. Should a tile be placed on these squares, the
                value of the tile will be multiplied by 2x or 3x. Some squares
                will also multiply the total value of the word and not just the
                single point value of one tile.
              </p>

              <p>
                Double Letter Scores - The light blue cells in the board are
                isolated and when these are used, they will double the value of
                the tile placed on that square.
              </p>

              <p>
                Triple Letter Score - The dark blue cell in the board will be
                worth triple the amount, so any tile placed here will earn more
                points.
              </p>

              <p>
                Double Word Score - When a cell is light red in colour, it is a
                double word cell and these run diagonally on the board, towards
                the four corners. When a word is placed on these squares, the
                entire value of the word will be doubled.
              </p>

              <p>
                Triple Word Score - The dark red square is where the high points
                can be earned as this will triple the word score. Placing any
                word on these squares will boos points drastically. These are
                found on all four sides of the board and are equidistant from
                the corners.
              </p>

              <p>
                One Single Use - When using the extra point squares on the
                board, they can only be used one time. If a player places a word
                here, it cannot be used as a multiplier by placing another word
                on the same square.
              </p>

              <h3>Starting the Game</h3>

              <p>
                Each player will start their turn with seven tiles from the
                Skrabl bag. There are three options during any turn. The player
                can place a word, they can exchange tiles for new tiles or they
                can choose to pass. In most cases, players will try to place a
                word as the other two options will result in no score.
              </p>

              <p>
                When a player chooses to exchange tiles, they can choose to
                exchange one or all of the tiles they currently hold. After
                tiles are exchanged, the turn is over and players will have to
                wait until their next turn to place a word on the board.
              </p>

              <p>
                Players can choose to pass at any time. They will forfeit that
                turn and hope to be able to play the next time. If six
                consecutive passes are made (three each player), the game will
                end and the one with the highest score will win. If there are no
                tiles left in the Skrabl pouch, then the game will end after two
                consecutive passes.
              </p>

              <h3>The First Word Score</h3>
              <p>
                When the game begins, the first player will place their word on
                the star spin in the centre of the board. The star is a double
                square and will offer a double word score. All players following
                will build their words off of this word, extending the game to
                other squares on the board.
              </p>

              <h3>Replacing Skrabl Tiles</h3>
              <p>
                Once tiles are played on the board, players will be given new
                tiles from the pouch to replace those. Players will always have
                seven tiles during the game.
              </p>

              <h3>The Fifty Point Bonus</h3>
              <p>
                Exciting rewards can come when players use all seven tiles to
                create a word on the board. When this happens, players will
                receive a 50 point bonus, in addition to the value of the word.
                If the game is near the end and players are not holding seven
                tiles, they do not get the bonus for using all of their tiles.
                This is only collected for seven letter words placed.
              </p>

              <h3>The End of a Skrabl Game</h3>
              <p>
                Once all tiles are gone from the bag and a single player has
                placed all of their tiles, the game will end and the player with
                the highest score wins.
              </p>

              <h3>Tallying Skrabl Scores</h3>
              <p>
                When the game ends, each player will count all points that are
                remaining on their tiles that have not been played. This amount
                will be deducted from the final score.
              </p>

              <p>
                An added bonus is awarded to the player that ended the game and
                has no remaining tiles. The tile values of all remaining players
                will be added to the score of the player who is out of tiles to
                produce the final score for the game.
              </p>

              <p>
                The Skrabl player with the highest score after all final scores
                are tallied wins.
              </p>

              <h3>Accepted Skrabl Words</h3>
              <p>
                Any word that is found in a standard English dictionary can be
                used in the game of Skrabl. Only British English spelling is
                accepted. Plurals and verbs in different forms (e.g. past tense)
                are valid. Words which are usually spelled with a capital letter
                (e.g. names) are not valid.
              </p>

              <p>
                There are some words that are not allowed to be played and these
                include suffixes, prefixes and abbreviations. Any word that
                requires the use of a hyphen or apostrophe cannot be played in
                the game. Any word that required the use of a capital letter is
                not allowed.
              </p>

              <p>
                When playing an English version of the game, foreign words are
                not allowed to be placed on the board. However, if the foreign
                word does appear in a standard English dictionary, it is
                allowed. The reason for this is due to the fact that the word is
                spoken enough and is considered part of the English language.
              </p>
            </>
          )}
          {lang === "de" && (
            <>
              <h1>Skrabl-Regeln</h1>
              <p>
                Wenn Sie Skrabl spielen, werden ein bis zwei Spieler Spaß haben
                das Spiel. Das Ziel beim Spielen ist es, mehr Punkte als andere
                zu erzielen Spieler. Wenn Wörter auf das Spielbrett gelegt
                werden, werden Punkte gesammelt und jeder Buchstabe, der im
                Spiel verwendet wird, hat einen anderen Punkt Wert. Die
                Hauptstrategie besteht darin, Wörter mit den höchsten Werten zu
                spielen mögliche Punktzahl basierend auf der
                Buchstabenkombination.
              </p>

              <h3> Das Skrabl-Board </h3>
              <p>
                Eine Skrabl-Karte besteht aus Zellen, die sich in befinden ein
                großes quadratisches Gitter. Das Board bietet 15 Zellen hoch und
                15 Zellen breit. Die im Spiel verwendeten Kacheln passen in jede
                Zelle auf dem Brett.
              </p>

              <h3> Skrabl-Kacheln </h3>
              <p>
                Es gibt 100 Plättchen, die im Spiel verwendet werden, und 98
                davon werden es tun Buchstaben und Punktwerte enthalten. Es gibt
                2 leere Kacheln, die können als wilde Kacheln verwendet werden,
                um den Platz eines Buchstabens einzunehmen. Wenn ein Leerzeichen
                gespielt wird, bleibt es im Spiel als der Buchstabe, den es
                ersetzt zum.
              </p>

              <p>
                Verschiedene Buchstaben im Spiel haben verschiedene Punktwerte
                und Dies hängt davon ab, wie selten der Brief ist und wie
                schwierig er sein kann diesen Brief zu legen. Leere Kacheln
                haben keine Punktwerte.
              </p>

              <h3> Kachelwerte </h3>
              <p>
                Unten sind die Punktwerte für jeden Buchstaben aufgeführt, der
                in a verwendet wird Skrabl Spiel.
              </p>

              <p> 0 Punkte - Leere Kachel. </p>

              <p> 1 Punkt - A, E, I, L, N, O, R, S, T und U. </p>

              <p> 2 Punkte - D und G. </p>

              <p> 3 Punkte - B, C, M und P. </p>

              <p> 4 Punkte - F, H, V, W und Y. </p>

              <p> 5 Punkte - K. </p>

              <p> 8 Punkte - J und X. </p>

              <p> 10 Punkte - Q und Z. </p>

              <h3> Zusätzliche Punktwerte </h3>
              <p>
                Wenn die Spieler auf das Brett schauen, werden sie sehen, dass
                einige Quadrate bieten Multiplikatoren. Sollte eine Kachel auf
                diese Quadrate gelegt werden, ist der Wert von Das Plättchen
                wird mit 2x oder 3x multipliziert. Einige Quadrate werden auch
                Multiplizieren Sie den Gesamtwert des Wortes und nicht nur den
                einzelnen Punkt Wert einer Kachel.
              </p>

              <p>
                Double Letter Scores - Die hellblauen Zellen auf der Tafel sind
                isoliert und wenn diese verwendet werden, verdoppeln sie den
                Wert von Fliese auf diesem Quadrat platziert.
              </p>

              <p>
                Triple Letter Score - Die dunkelblaue Zelle auf dem Brett ist es
                wert Verdreifache den Betrag, sodass jedes hier platzierte
                Plättchen mehr Punkte bringt.
              </p>

              <p>
                Double Word Score - Wenn eine Zelle hellrot ist, ist es a
                Doppelwortzelle und diese verlaufen diagonal auf der Tafel in
                Richtung vier Ecken. Wenn ein Wort auf diese Quadrate gesetzt
                wird, das Ganze Der Wert des Wortes wird verdoppelt.
              </p>

              <p>
                Triple Word Score - Auf dem dunkelroten Quadrat können die
                Höhepunkte angezeigt werden verdient werden, da dies die
                Wortpunktzahl verdreifacht. Ein Wort aufsetzen Diese Quadrate
                werden die Punkte drastisch erhöhen. Diese sind auf allen zu
                finden vier Seiten der Platte und sind von den Ecken gleich weit
                entfernt.
              </p>

              <p>
                Einmaliger Gebrauch - Wenn Sie die zusätzlichen Punktquadrate
                auf dem Brett verwenden, Sie können nur einmal verwendet werden.
                Wenn ein Spieler hier ein Wort platziert, ist es kann nicht als
                Multiplikator verwendet werden, indem ein anderes Wort darauf
                gesetzt wird Quadrat.
              </p>

              <h3> Spiel starten </h3>

              <p>
                Jeder Spieler beginnt seinen Zug mit sieben Plättchen aus dem
                Skrabl Tasche. In jeder Runde gibt es drei Möglichkeiten. Der
                Spieler kann ein Wort platzieren, sie können Kacheln gegen neue
                Kacheln austauschen oder sie können entscheide dich zu bestehen.
                In den meisten Fällen versuchen die Spieler, ein Wort als zu
                platzieren Die beiden anderen Optionen führen zu keiner
                Punktzahl.
              </p>

              <p>
                Wenn ein Spieler Steine ​​austauschen möchte, kann er diese
                austauschen eine oder alle Kacheln, die sie derzeit halten. Nach
                Fliesen sind ausgetauscht, der Zug ist vorbei und die Spieler
                müssen warten bis ihre nächste Runde, um ein Wort an die Tafel
                zu setzen.
              </p>

              <p>
                Spieler können jederzeit passen. Sie werden diese Runde
                verlieren und hoffe, das nächste Mal spielen zu können. Wenn
                sechs aufeinanderfolgende Pässe gemacht werden (drei pro
                Spieler), endet das Spiel und derjenige mit der höchsten
                Punktzahl wird gewinnen. Wenn im Skrabl-Beutel keine Kacheln
                mehr vorhanden sind, endet das Spiel nach zwei aufeinander
                folgenden Durchgängen.
              </p>

              <h3> Die erste Wortpartitur </h3>
              <p>
                Wenn das Spiel beginnt, setzt der erste Spieler sein Wort auf
                Der Stern dreht sich in der Mitte des Bretts. Der Stern ist ein
                Doppel Quadrat und bietet eine doppelte Wortzahl. Alle Spieler
                folgen werden ihre Worte aus diesem Wort aufbauen und das Spiel
                auf erweitern andere Quadrate auf dem Brett.
              </p>

              <h3> Ersetzen von Skrabl-Kacheln </h3>
              <p>
                Sobald die Steine ​​auf dem Brett gespielt wurden, erhalten die
                Spieler neue Fliesen aus dem Beutel, um diese zu ersetzen.
                Spieler werden immer haben sieben Plättchen während des Spiels.
              </p>

              <h3> Der Fünfzig-Punkte-Bonus </h3>
              <p>
                Spannende Belohnungen können kommen, wenn Spieler alle sieben
                Kacheln verwenden Erstelle ein Wort an der Tafel. Wenn dies
                passiert, werden die Spieler Sie erhalten zusätzlich zum Wert
                des Wortes einen Bonus von 50 Punkten. Wenn das Spiel zu Ende
                ist und die Spieler keine sieben halten Kacheln erhalten sie
                nicht den Bonus für die Verwendung aller Kacheln. Dies wird nur
                für Wörter mit sieben Buchstaben gesammelt.
              </p>

              <h3> Das Ende eines Skrabl-Spiels </h3>
              <p>
                Sobald alle Steine ​​aus der Tasche verschwunden sind und ein
                einzelner Spieler hat Wenn alle ihre Kacheln platziert werden,
                endet das Spiel und der Spieler mit Die höchste Punktzahl
                gewinnt.
              </p>

              <h3> Skrabl-Ergebnisse zählen </h3>
              <p>
                Wenn das Spiel endet, zählt jeder Spieler alle Punkte, die es
                gibt auf ihren Plättchen bleiben, die nicht gespielt wurden.
                Diese Menge wird vom Endergebnis abgezogen.
              </p>

              <p>
                Ein zusätzlicher Bonus wird an den Spieler vergeben, der das
                Spiel beendet hat und hat keine verbleibenden Kacheln. Die
                Kachelwerte aller verbleibenden Spieler wird zur Punktzahl des
                Spielers hinzugefügt, der keine Kacheln mehr hat Produziere das
                Endergebnis für das Spiel.
              </p>

              <p>
                Der Skrabl-Spieler mit der höchsten Punktzahl nach allen
                Endergebnissen sind gewählte Siege.
              </p>

              <h3> Akzeptierte Skrabl-Wörter </h3>
              <p>
                Jedes Wort, das in einem englischen Standardwörterbuch gefunden
                wird, kann sein im Spiel von Skrabl verwendet. Es wird nur die
                britische Rechtschreibung akzeptiert. Pluralformen und Verben in
                verschiedenen Formen (z. B. Vergangenheitsform) sind gültig.
                Wörter, die normalerweise mit einem Großbuchstaben geschrieben
                werden (z. B. Namen), sind ungültig.
              </p>

              <p>
                Es gibt einige Wörter, die nicht gespielt werden dürfen und
                diese Fügen Sie Suffixe, Präfixe und Abkürzungen hinzu. Jedes
                Wort das erfordert die Verwendung eines Bindestrichs oder
                Apostrophs kann nicht gespielt werden das Spiel. Jedes Wort, für
                das ein Großbuchstabe erforderlich ist, lautet nicht erlaubt.
              </p>

              <p>
                Wenn Sie eine englische Version des Spiels spielen, sind
                Fremdwörter darf nicht auf die Tafel gelegt werden. Wenn jedoch
                der Ausländer Das Wort erscheint in einem englischen
                Standardwörterbuch erlaubt. Der Grund dafür ist die Tatsache,
                dass das Wort ist genug gesprochen und gilt als Teil der
                englischen Sprache.
              </p>
            </>
          )}
          {lang === "tr" && (
            <>
              <h1> Skrabl Kuralları </h1>
              <p>
                Skrabl oynarken, bir ila iki oyuncu her yerde eğlenecek oyun.
                Oynarken amaç daha fazla puan elde etmektir diğer oyuncular.
                Kelimeler oyun tahtasına yerleştirildikçe, puanlar toplanır ve
                oyunda kullanılan her harf bir farklı nokta değeri. Ana strateji
                şu kelimeleri oynamaktır: kombinasyonuna göre mümkün olan en
                yüksek puana sahip olmak harfler.
              </p>

              <h3> Skrabl Kurulu </h3>
              <p>
                Skrabl tahtası, büyük bir alanda bulunan hücrelerden
                oluşacaktır. kare ızgara. Kart, 15 hücre yüksekliğinde ve 15
                hücre genişliğinde sunuyor. Oyunda kullanılan karolar tahtadaki
                her hücreye sığacak.
              </p>

              <h3> Skrabl Karoları </h3>
              <p>
                Oyunda kullanılan 100 karo ve 98 tanesi var harfler ve nokta
                değerleri içerecektir. 2 boş döşeme var herhangi bir mektubun
                yerini almak için vahşi fayans olarak kullanılabilir. Bir boşluk
                oynandığında, oyunda harf olarak kalır onun yerine.
              </p>

              <p>
                Oyundaki farklı harfler farklı puan değerlerine sahip olacak ve
                bu mektubun ne kadar nadir olduğuna ve ne kadar zor olduğuna
                bağlı olacaktır. bu mektubu koymak olabilir. Boş döşemelerin bir
                anlamı olmayacak değerler.
              </p>

              <h3> Döşeme Değerleri </h3>
              <p>
                Aşağıda, her harf için kullanılan her harf için nokta değerleri
                verilmiştir. Skrabl oyunu.
              </p>

              <p> 0 Puan - Boş kutucuk. </p>

              <p> 1 Nokta - A, E, I, L, N, O, R, S, T ve U. </p>

              <p> 2 Puan - D ve G. </p>

              <p> 3 Puan - B, C, M ve P. </p>

              <p> 4 Puan - F, H, V, W ve Y </p>

              <p> 5 Puan - K. </p>

              <p> 8 Puan - J ve X. </p>

              <p> 10 Puan - Q ve Z. </p>

              <h3> Ekstra Nokta Değerleri </h3>
              <p>
                Tahtaya bakarken, oyuncular bazı kareler görecek teklif
                çarpanları. Bu karelere bir kiremit yerleştirilirse, döşemenin
                değeri 2x veya 3x ile çarpılır. Bazı kareler sadece kelimenin
                değil, kelimenin toplam değerini de bir döşemenin tek nokta
                değeri.
              </p>

              <p>
                Çift Mektup Skorları - Karttaki açık mavi hücreler izole
                edildiğinde ve bunlar kullanıldığında, kiremit o kareye
                yerleştirilir.
              </p>

              <p>
                Üçlü Mektup Puanı - Karttaki koyu mavi hücre üç kat değerinde,
                bu yüzden buraya yerleştirilen karolar daha fazla kazanacak
                puan.
              </p>

              <p>
                Çift Kelime Puanı - Bir hücre açık kırmızı renkte olduğunda,
                çift ​​kelime hücresi ve bunlar tahtada, dört köşe. Bu karelere
                bir kelime yerleştirildiğinde, kelimenin tüm değeri iki katına
                çıkar.
              </p>

              <p>
                Üçlü Kelime Puanı - Koyu kırmızı kare, yüksek noktaların Bu,
                kelime skorunu üç katına çıkaracağı için kazanılabilir. Herhangi
                bir yerleştirme bu karelerdeki kelime büyük ölçüde puan
                kazanacak. Bunlar tahta dört tarafında bulunur ve eşit uzaklıkta
                köşeleri.
              </p>

              <p>
                Tek Kullanımlık - Ekrandaki ekstra nokta karelerini kullanırken
                tahta, sadece bir kez kullanılabilir. Bir oyuncu bir kelime
                yerleştirirse burada, başka bir kelime koyarak çarpan olarak
                kullanılamaz aynı meydanda.
              </p>

              <h3> Oyuna Başlama </h3>

              <p>
                Her oyuncu sırayla Skrabl çantası. Herhangi bir dönüş sırasında
                üç seçenek vardır. Oyuncu bir kelime yerleştirebilir, yeni
                fayanslar için fayans değişimi yapabilir veya geçmek
                seçebilirsiniz. Çoğu durumda, oyuncular bir diğer iki seçenek
                olarak hiçbir puan ile sonuçlanmayacaktır.
              </p>

              <p>
                Bir oyuncu fayans değiştirmeyi seçtiğinde, şu anda sahip
                oldukları karolardan birini veya tümünü değiştirin. Sonra fayans
                değiştirilir, sıra bitti ve oyuncular tahtaya bir kelime
                yerleştirmek için bir sonraki sıraya kadar bekleyin.
              </p>

              <p>
                Oyuncular istedikleri zaman geçmeyi seçebilirler. Bunu
                kaybedecekler bir dahaki sefere oynayabilmeyi umuyoruz. Eğer
                altı ardışık paslar yapılır (her oyuncu üç), oyun ve en yüksek
                puana sahip olan kazanır. Eğer yoksa Skrabl torbasında kalan
                karolar, oyun iki sonra bitecek ardışık geçişler.
              </p>

              <h3> İlk Kelime Puanı </h3>
              <p>
                Oyun başladığında, ilk oyuncu sözlerini Tahtanın ortasındaki
                yıldız dönüşü. Yıldız bir çift kare ve çift kelime puanı
                sunacak. Takip eden tüm oyuncular kelimelerini bu kelimeden
                oluşturacak, oyunu tahtadaki diğer kareler.
              </p>

              <h3> Skrabl Karoları Değiştirme </h3>
              <p>
                Fayans tahtada oynandıktan sonra, oyunculara yeni verilir
                Bunları değiştirmek için kese fayans. Oyuncular her zaman oyun
                sırasında yedi fayans.
              </p>

              <h3> Elli Puan Bonusu </h3>
              <p>
                Oyuncular yedi kutucuğun hepsini kullanmak için heyecan verici
                ödüller gelebilir. tahtada bir kelime oluşturmak. Bu olduğunda,
                oyuncular kelimenin değerine ek olarak 50 puanlık bonus
                kazanırsınız. Oyun sona yaklaştıysa ve oyuncular yedi tutmuyorsa
                fayans, tüm karolarını kullanma bonusu alamazlar. Bu sadece
                yerleştirilen yedi harfli kelime için toplanır.
              </p>

              <h3> Skrabl Oyunun Sonu </h3>
              <p>
                Tüm fayanslar çantadan çıktığında ve tek bir oyuncu tüm
                taşlarını yerleştirdiler, oyun bitecek ve oyuncu en yüksek puan
                kazanır.
              </p>

              <h3> Skrabl Skorlarını Karşılama </h3>
              <p>
                Oyun sona erdiğinde, her oyuncu tüm puanları sayar. oynanmamış
                fayanslarında kalıyor. Bu miktar final skorundan düşülecektir.
              </p>

              <p>
                Oyunu bitiren oyuncuya ek bir bonus verilir ve kalan döşemeleri
                yok. Kalan tüm oyuncuların döşeme değerleri için fayans dışı
                olan oyuncunun skoruna eklenecek oyunun son skorunu üretir.
              </p>

              <p>
                Tüm final skorlarından sonra en yüksek puanı alan Skrabl
                oyuncusu kazanılan kazanır.
              </p>

              <h3> Kabul Edilen Skrabl Kelimeleri </h3>
              <p>
                Standart İngilizce sözlükte bulunan herhangi bir kelime Skrabl
                oyununda kullanılır. Sadece İngiliz İngilizcesi yazım kabul
                edilir. Çoğullar ve farklı formlardaki fiiller (mesela geçmiş
                zaman) geçerlidir. Genellikle büyük harfle yazılan kelimeler
                (mesela adlar) geçerli değildir.
              </p>

              <p>
                Çalınmasına izin verilmeyen bazı kelimeler var ve bunlar
                sonekleri, önekleri ve kısaltmaları içerir. Herhangi bir kelime
                tire veya kesme işareti kullanılmasını gerektirmez oyun. Büyük
                harf kullanımını gerektiren herhangi bir kelime izin verilmedi.
              </p>

              <p>
                Oyunun İngilizce versiyonunu oynarken yabancı kelimeler tahtaya
                yerleştirilmesine izin verilmez. Ancak, yabancı kelime standart
                İngilizce sözlükte görünüyor, izin verdi. Bunun nedeni,
                kelimenin yeterince konuşulur ve İngilizce dilinin bir parçası
                olarak kabul edilir.
              </p>
            </>
          )}
          {lang === "fr" && (
            <>
              <h1> Règles Skrabl </h1>
              <p>
                Lorsque vous jouez à Skrabl, de un à deux joueurs apprécieront
                le jeu. Le but en jouant est de marquer plus de points que
                d'autres joueurs. Lorsque les mots sont placés sur le plateau de
                jeu, les points sont collectées et chaque lettre utilisée dans
                le jeu aura un valeur de point différente. La stratégie
                principale est de jouer des mots qui avoir le score le plus
                élevé possible en fonction de la combinaison de des lettres.
              </p>

              <h3> Le tableau Skrabl </h3>
              <p>
                Un tableau Skrabl sera composé de cellules situées dans un grand
                grille carrée. La carte offre 15 cellules de haut et 15 cellules
                de large. Les tuiles utilisées dans le jeu rentreront dans
                chaque cellule du plateau.
              </p>

              <h3> Tuiles Skrabl </h3>
              <p>
                Il y a 100 tuiles qui sont utilisées dans le jeu et 98 d'entre
                elles contiendra des lettres et des valeurs en points. Il y a 2
                tuiles vierges qui peuvent être utilisées comme tuiles sauvages
                pour remplacer n'importe quelle lettre. Lorsqu'un blanc est
                joué, il restera dans le jeu en tant que lettre il a remplacé.
              </p>

              <p>
                Différentes lettres du jeu auront différentes valeurs de points
                et cela dépendra de la rareté de la lettre et de sa difficulté
                peut être de déposer cette lettre. Les carreaux vierges n'auront
                aucun intérêt valeurs.
              </p>

              <h3> Valeurs de tuile </h3>
              <p>
                Vous trouverez ci-dessous les valeurs en points pour chaque
                lettre utilisée dans un Jeu de Skrabl.
              </p>

              <p> 0 point - tuile vierge. </p>

              <p> 1 point - A, E, I, L, N, O, R, S, T et U. </p>

              <p> 2 points - D et G. </p>

              <p> 3 points - B, C, M et P. </p>

              <p> 4 points - F, H, V, W et Y. </p>

              <p> 5 points - K. </p>

              <p> 8 points - J et X. </p>

              <p> 10 points - Q et Z. </p>
              <p>
                En regardant le tableau, les joueurs verront que certaines cases
                offrir des multiplicateurs. Si une tuile est placée sur ces
                cases, le la valeur de la tuile sera multipliée par 2x ou 3x.
                Quelques carrés multipliera également la valeur totale du mot et
                pas seulement le valeur de point unique d'une tuile.
              </p>

              <p>
                Scores en double lettre - Les cellules bleu clair du tableau
                sont isolés et lorsqu'ils sont utilisés, ils doubleront la
                valeur de la tuile placée sur cette case.
              </p>

              <p>
                Score triple lettre - La cellule bleu foncé du tableau sera vaut
                le triple du montant, donc toute tuile placée ici gagnera plus
                points.
              </p>

              <p>
                Score de mot double - Lorsqu'une cellule est de couleur rouge
                clair, c'est un double cellule de mot et ceux-ci se dirigent en
                diagonale sur le tableau, vers les quatre coins. Lorsqu'un mot
                est placé sur ces carrés, le la valeur entière du mot sera
                doublée.
              </p>

              <p>
                Score triple mot - Le carré rouge foncé est l'endroit où les
                points forts peut être gagné car cela triplera le score de mots.
                Placer tout mot sur ces carrés fera huer les points de manière
                drastique. Ceux-ci sont trouvés sur les quatre côtés de la
                planche et sont équidistants de les coins.
              </p>

              <p>
                Une seule utilisation - Lors de l'utilisation des carrés de
                points supplémentaires sur le conseil d'administration, ils ne
                peuvent être utilisés qu'une seule fois. Si un joueur place un
                mot ici, il ne peut pas être utilisé comme multiplicateur en
                plaçant un autre mot sur le même carré.
              </p>

              <h3> Démarrer le jeu </h3>

              <p>
                Chaque joueur commencera son tour avec sept tuiles du Sac
                Skrabl. Il y a trois options à chaque tour. Le joueur peuvent
                placer un mot, ils peuvent échanger des tuiles contre de
                nouvelles tuiles ou ils peut choisir de passer. Dans la plupart
                des cas, les joueurs essaieront de placer un mot car les deux
                autres options n'entraîneront aucun score.
              </p>

              <p>
                Lorsqu'un joueur choisit d'échanger des tuiles, il peut choisir
                de échanger une ou toutes les tuiles qu'ils détiennent
                actuellement. Après les tuiles sont échangées, le tour est
                terminé et les joueurs devront attendez leur prochain tour pour
                placer un mot au tableau.
              </p>

              <p>
                Les joueurs peuvent choisir de passer à tout moment. Ils
                perdront cela tourner et espérer pouvoir jouer la prochaine
                fois. Si six des passes consécutives sont effectuées (trois par
                joueur), le jeu fin et celui avec le score le plus élevé
                gagnera. S'il n'y a pas tuiles laissées dans la pochette Skrabl,
                puis le jeu se terminera après deux passes consécutives.
              </p>

              <h3> Le score du premier mot </h3>
              <p>
                Lorsque le jeu commence, le premier joueur placera sa parole sur
                l'étoile tourne au centre du plateau. L'étoile est un double
                carré et offrira un double score de mots. Tous les joueurs
                suivant construiront leurs mots sur ce mot, étendant le jeu à
                autres carrés sur le plateau.
              </p>

              <h3> Remplacement des tuiles Skrabl </h3>
              <p>
                Une fois les tuiles jouées sur le plateau, les joueurs recevront
                de nouveaux tuiles de la pochette pour les remplacer. Les
                joueurs auront toujours sept tuiles pendant le jeu.
              </p>

              <h3> Le bonus de cinquante points </h3>
              <p>
                Des récompenses intéressantes peuvent venir lorsque les joueurs
                utilisent les sept tuiles pour créez un mot au tableau. Lorsque
                cela se produit, les joueurs recevez un bonus de 50 points, en
                plus de la valeur du mot. Si le jeu approche de la fin et que
                les joueurs n'en ont pas sept tuiles, ils n'obtiennent pas le
                bonus pour l'utilisation de toutes leurs tuiles. Ceci n'est
                collecté que pour les mots de sept lettres placés.
              </p>

              <h3> La fin d'un jeu Skrabl </h3>
              <p>
                Une fois que toutes les tuiles sont parties du sac et qu'un seul
                joueur a placé toutes leurs tuiles, le jeu se terminera et le
                joueur avec le score le plus élevé l'emporte.
              </p>

              <h3> Comptage des scores de Skrabl </h3>
              <p>
                À la fin du jeu, chaque joueur comptera tous les points restant
                sur leurs tuiles qui n'ont pas été jouées. Cette somme sera
                déduit du score final.
              </p>

              <p>
                Un bonus supplémentaire est attribué au joueur qui a terminé le
                jeu et n'a pas de tuiles restantes. Les valeurs des tuiles de
                tous les joueurs restants sera ajouté au score du joueur qui n'a
                plus de tuiles pour produire le score final du jeu.
              </p>

              <p>
                Le joueur Skrabl avec le score le plus élevé après tous les
                scores finaux sont comptés des victoires.
              </p>

              <h3> Mots Skrabl acceptés </h3>
              <p>
                Tout mot qui se trouve dans un dictionnaire anglais standard
                peut être utilisé dans le jeu de Skrabl. Seule l'orthographe
                anglaise britannique est acceptée. Les pluriels et les verbes
                sous différentes formes (par exemple le passé) sont valides. Les
                mots qui sont généralement écrits avec une majuscule (par
                exemple les noms) ne sont pas valides.
              </p>

              <p>
                Il y a des mots qui ne peuvent pas être joués et ceux-ci inclure
                des suffixes, des préfixes et des abréviations. Tout mot qui
                nécessite l'utilisation d'un trait d'union ou une apostrophe ne
                peut pas être joué dans le jeu. Tout mot nécessitant
                l'utilisation d'une majuscule est interdit.
              </p>

              <p>
                Lorsque vous jouez à une version anglaise du jeu, les mots
                étrangers sont ne peut pas être placé sur le plateau. Cependant,
                si l'étranger mot apparaît dans un dictionnaire anglais
                standard, c'est permis. La raison en est que le mot est assez
                parlé et est considéré comme faisant partie de la langue
                anglaise.
              </p>
            </>
          )}
        </div>
        <div className="rulesModal__buttons">
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
      </Fade>
  );
};

export default RulesModal;
