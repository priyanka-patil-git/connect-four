

Game.do = (function() {
   
    function addDiscToBoard(x_pos, y_pos) {
      Game.board[y_pos][x_pos] = Game.currentPlayer;
    }
  
       function printBoard() {
      var row, cell;
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        for (var x = 0; x <= Game.config.boardLength; x++) {
          if (Game.check.isPositionTaken(x, y)) {
            row = document.querySelector('tr:nth-child(' + (1 + y) + ')');
            cell = row.querySelector('td:nth-child(' + (1 + x) + ')');
            cell.firstElementChild.classList.add(Game.board[y][x]);
          }
        }
      }
    }
  
   
    function changePlayer() {
      var currentPlayerNameEl = document.querySelector('#current-player');
      var otherPlayerNameEl = document.querySelector('#next-player');
  
      // Switch players
      var otherPlayer = Game.currentPlayer
      var otherPlayerName = currentPlayerNameEl.textContent;
      var currentPlayerName = otherPlayerNameEl.textContent;
      Game.currentPlayer = (Game.currentPlayer === 'black') ? 'red' : 'black';
  
  
      // Update the players in the UI.
      currentPlayerNameEl.classList.remove(otherPlayer);
      currentPlayerNameEl.classList.add(Game.currentPlayer);
      currentPlayerNameEl.textContent = currentPlayerName;
  
      otherPlayerNameEl.classList.remove(Game.currentPlayer);
      otherPlayerNameEl.classList.add(otherPlayer);
      otherPlayerNameEl.textContent = otherPlayerName;
  
    }
  
    
    function dropToBottom(x_pos, y_pos) {
     
      for (var y = Game.config.boardHeight; y > y_pos; y--) {
        if (!Game.check.isPositionTaken(x_pos, y)) {
          return y;
        }
      }
      return y_pos;
    }
  
   
    return {
      addDiscToBoard,
      printBoard,
      changePlayer,
      dropToBottom,
     
    };
  })();
  
  Game.check = (function() {
    
    function isPositionTaken(x_pos, y_pos) {
      return Game.board[y_pos][x_pos] !== 0;
    }
  
   
    function isGameADraw() {
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        for (var x = 0; x <= Game.config.boardLength; x++) {
          if (!isPositionTaken(x, y)) {
            return false;
          }
        }
      }
      return true;
    }
  
    
    function isHorizontalWin() {
      var currentValue = null,
          previousValue = 0,
          tally = 0;
  
      // Scan each row in series, tallying the length of each series. If a series
      // ever reaches four, return true for a win.
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        for (var x = 0; x <= Game.config.boardLength; x++) {
          currentValue = Game.board[y][x];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // Reset the tally if you find a gap.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
        }
  
        // After each row, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
      }
  
     
      return false;
    }
  
  
    function isVerticalWin() {
      var currentValue = null,
          previousValue = 0,
          tally = 0;
  
     
      for (var x = 0; x <= Game.config.boardLength; x++) {
        for (var y = 0; y <= Game.config.boardHeight; y++) {
          currentValue = Game.board[y][x];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
        }
  
      
        tally = 0;
        previousValue = 0;
      }
  
      
      return false;
    }
  
  
    function isDiagonalWin() {
      var x = null,
          y = null,
          xtemp = null,
          ytemp = null,
          currentValue = null,
          previousValue = 0,
          tally = 0;
  
     
      for (x = 0; x <= Game.config.boardLength; x++) {
        xtemp = x;
        ytemp = 0;
  
        while (xtemp <= Game.config.boardLength && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
  
                   xtemp++;
          ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
      }
  
      // Test for down-left diagonals across the top.
      for (x = 0; x <= Game.config.boardLength; x++) {
        xtemp = x;
        ytemp = 0;
  
        while (0 <= xtemp && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // Reset the tally if you find a gap.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
  
          // Shift down-left one diagonal index.
          xtemp--;
          ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
      }
  
      // Test for down-right diagonals down the left side.
      for (y = 0; y <= Game.config.boardHeight; y++) {
        xtemp = 0;
        ytemp = y;
  
        while (xtemp <= Game.config.boardLength && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // Reset the tally if you find a gap.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
  
          // Shift down-right one diagonal index.
          xtemp++;
          ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
      }
  
      // Test for down-left diagonals down the right side.
      for (y = 0; y <= Game.config.boardHeight; y++) {
        xtemp = Game.config.boardLength;
        ytemp = y;
  
        while (0 <= xtemp && ytemp <= Game.config.boardHeight) {
          currentValue = Game.board[ytemp][xtemp];
          if (currentValue === previousValue && currentValue !== 0) {
            tally += 1;
          } else {
            // Reset the tally if you find a gap.
            tally = 0;
          }
          if (tally === Game.config.countToWin - 1) {
            return true;
          }
          previousValue = currentValue;
  
          // Shift down-left one diagonal index.
          xtemp--;
          ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
      }
  
      // No diagonal wins found. Return false.
      return false;
    }
  
   return {
     isPositionTaken,
     isGameADraw,
     isHorizontalWin,
     isVerticalWin,
     isDiagonalWin
   }
  
  })();
  